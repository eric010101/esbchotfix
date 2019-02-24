<?php
$source= $_GET['source'];
$ip= $_GET['ip'];
$filename= $_GET['filename'];
$port= $_GET['port'];
?>

<!DOCTYPE html>
<html>
<body>

已經為您將檔案上傳到IPFS服務器，並且放在區塊鏈上<BR>
此檔案已完成數位資產化,並具有全球唯一性,無法再修改<BR>
<BR>
<audio controls autoplay>
  <source src="<?php echo "http://".$source.":".$port."/ipfs/".$filename; ?>" type="audio/ogg">
  <source src="<?php echo "http://".$source.":".$port."/ipfs/".$filename; ?>" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>
<BR>
<BR>
數位資產IPFS連結是: <BR>
<?php echo "http://".$source.":".$port."/ipfs/".$filename; ?> <BR>
若您使用wechat, 請選擇右下角的 '訪問原網頁' <BR>
以上服務是由<a href="http://equalsmart.com"> 齐智(福州)科技公司</a>為您提供!<BR>
我們是智恆科技園區孵化器進駐廠商之一<BR>

</body>
</html>
