<?php

function strToHex($string){
    $hex = '';
    for ($i=0; $i<strlen($string); $i++){
        $ord = ord($string[$i]);
        $hexCode = dechex($ord);
        $hex .= substr('0'.$hexCode, -2);
    }
    return strToUpper($hex);
}

$conn = new mysqli("localhost", "ESBCadmin", "ESBChappy", "esbc_water");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql1 = "SELECT Rindex,id,Rtime,TDS1,TDS2,COD,TOC,UV254,flow FROM WLB WHERE RecordTime > DATE_ADD(CURRENT_TIMESTAMP,INTERVAL -20 SECOND) AND Hash is NULL" ;
//$sql2 = "SELECT * FROM WLB WHERE RecordTime > DATE_ADD(CURRENT_TIMESTAMP,INTERVAL -1 MINUTE)" ;
$result = $conn->query($sql1);

$dataarr = array();
$rindexarr = array();
if ($result->num_rows > 0) {
    while($r = $result->fetch_assoc()) {
		$dataarr[]=$r;
		$rindexarr[] = $r['Rindex'];
    }
	//echo json_encode($dataarr);
} else {
    echo "no data found";
}

$datastr = json_encode($dataarr);
$Rindexstr = json_encode($rindexarr);
#echo $datastr;
#echo "----------";
#echo $Rindexstr;
//echo strToHex($datastr);

require('./exampleBase.php');
$eth = $web3->eth;

$eth->accounts(function ($err, $accounts) use ($eth,$datastr,$rindexarr,$conn) {
    if ($err !== null) {
        echo 'Error: ' . $err->getMessage();
        return;
    }
    $fromAccount = $accounts[0];
    $toAccount = $accounts[1];

    // send transaction
    $eth->sendTransaction([
        'from' => $fromAccount,
        'to' => $toAccount,
		'gas' => '0x200b20',
        'value' => '0x11',
		'data' => '0x'.strToHex($datastr)
    ], function ($err, $transaction) use ($eth, $fromAccount, $toAccount,$rindexarr,$conn,$datastr) {
        if ($err !== null) {
            echo 'Error: ' . $err->getMessage();
            return;
        }
        echo 'Tx hash: ' . $transaction . PHP_EOL;
		#echo json_encode($rindexarr);
		for($i=0;$i<sizeof($rindexarr);$i++){
			$sql2 = "UPDATE WLB SET Hash='".$transaction."' WHERE Rindex ='".$rindexarr[$i]."'";
			//echo $sql2."<br>";
			if (mysqli_query($conn, $sql2)) {
				echo "update OK~";	
			}
		}

		$sql3 = "insert into esbc_clog (`txHash`,`fromacc`,`inputdata`) VALUES ('". $transaction ."','". $fromAccount ."','". $datastr ."')" ;
		#echo $sql3."<br>";
		if (mysqli_query($conn, $sql3)) {
			$last_id = mysqli_insert_id($conn);
			echo "Insert".$last_id;	
		}
		
    });
});


$sql11 = "SELECT txHash FROM esbc_clog WHERE BlockN is NULL" ;
$result11 = $conn->query($sql11);

$txhasharr = array();
$txsize = '';

if ($result11->num_rows > 0) {
    while($r11 = $result11->fetch_assoc()) {
		$txhasharr[]=$r11;
    }
	//echo json_encode($dataarr);
	if (sizeof($txhasharr)>10){
		$txsize = 10;
	}else{
		$txsize = sizeof($txhasharr);
	}
} else {
    echo "no data found11111";
}

$txhashstr = json_encode($txhasharr);
//echo $txhashstr."<br>";
//echo $txsize."<br>";
//require('./exampleBase.php');
//$eth = $web3->eth;

for ($i=0; $i<$txsize; $i++) {
	//echo $txhasharr[0]['txHash'];
	//echo $txhasharr[$i]['txHash'];
	$eth->getTransactionByHash($txhasharr[$i]['txHash'], function ($err, $transaction) use ($conn) {
		if ($err !== null) {
			echo 'Error: ' . $err->getMessage();
			return;
			//return $this->assertTrue($err !== null);
		}
		//$this->assertTrue($transaction == null);
		//echo $transaction;
		//$txarr = $transactions;
		#echo json_encode($transaction);
		$blockn=hexdec($transaction->{'blockNumber'});
		$txgas= hexdec($transaction->{'gas'});
		$gasprice= hexdec($transaction->{'gasPrice'});
		$nonce= hexdec($transaction->{'nonce'});
		$ethvalue= hexdec($transaction->{'value'});
		$txhashhex= $transaction->{'hash'};
		if ($blockn > 0){
			$sql12 = "UPDATE esbc_clog SET BlockN ='".$blockn."',Gas ='".$txgas."',costeth ='".$ethvalue."' WHERE txHash like '".$txhashhex."'";
			#echo $sql12."<br>";
			if (mysqli_query($conn, $sql12)) {
				echo "update OK~";	
			}
			$sql13 = "UPDATE WLB SET BlockN ='".$blockn."' WHERE Hash like '".$txhashhex."'";
			#echo $sql12."<br>";
			if (mysqli_query($conn, $sql12)) {
				echo "update OK~";	
			}
			$sql14 = "insert into blockn (`blockn`,`txhash`) VALUES ('". $blockn ."','". $txhashhex ."')" ;
			//echo $sql14."<br>";
			if (mysqli_query($conn, $sql14)) {
				$last_id2 = mysqli_insert_id($conn);
				echo "Insert".$last_id2;	
			}
		}
		
	});
}


$sql21 = "SELECT blockn FROM blockn WHERE block_detail is NULL" ;
$result21 = $conn->query($sql21);
$bcnarr = array();
$bcnsize = '';

if ($result21->num_rows > 0) {
    while($r21 = $result21->fetch_assoc()) {
		$bcnarr[]=$r21;
    }
	//echo json_encode($bcnarr);
	if (sizeof($bcnarr)>10){
		$bcnsize = 10;
	}else{
		$bcnsize = sizeof($bcnarr);
	}
} else {
    echo "no data found22222222";
}
$bcnstr = json_encode($bcnarr);
echo "<br>";
echo $bcnstr;


for ($j=0; $j<$bcnsize; $j++) {
	$bcnint = (int)$bcnarr[$j]['blockn'];
	echo $bcnint;
	$eth->getBlockByNumber($bcnint, true, function ($err, $block) use ($conn,$bcnint) {
		//$hash= $block->{'hash'};
		//echo $hash."<br>";
        //$size= hexdec($block->{'size'});
        //$number=hexdec($block->{'number'});
        //$gasUsed= hexdec($block->{'gasUsed'});
		//$timestamp = $block->{'timestamp'};
        //$timestamp = base_convert($timestamp, 16, 10);
        //$timestamp = date('Y-m-d H:i:s', $timestamp);
        //$TXn = sizeof($block->transactions);
        //$txtime[] = $timestamp;
        //echo $txtime;
		/*
        $txarr = [];
        if ($TXn > 0) {
            $txarr = $block->transactions;
		}
		*/
		$blockstr = json_encode($block);
		//echo $blockstr;
		
		$sql22 = "UPDATE blockn SET block_detail ='".$blockstr."' WHERE blockn = '".$bcnint."'";
		echo $sql22."<br>";
		if (mysqli_query($conn, $sql22)) {
			echo "update OK~";	
		}
		
	});
}

$conn->close();

?>
