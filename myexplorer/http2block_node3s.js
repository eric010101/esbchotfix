const hostconfig = require('./hostconfig');
let hostip = hostconfig.hostip(); // val is ip  
let rpcport_node1 = hostconfig.rpcport_node1(); // rpcport=8544  
let rpcport_node2 = hostconfig.rpcport_node2(); // rpcport=8545 
let rpcport_node3 = hostconfig.rpcport_node3(); // rpcport=8546
let rpcport_node4 = hostconfig.rpcport_node4(); // rpcport=8547
var hosturl = "http://"+hostip+":"+rpcport_node3;

var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var moment = require('moment');

var urlObject = url.parse(req.url, true, false);
var hostName = urlObject.hostname;
console.log("Host Name : " + hostName);

var path = urlObject.path;
console.log("Path : " + path);

// Query string is a JSON object.
//var queryStringObject = urlObject.query;
//console.log("Query String : " + JSON.stringify(queryStringObject));

var pathname = url.parse(req.url).pathname;
// 输出请求的文件名
console.log("Request for " + pathname + " received.");
// 从文件系统中读取请求的文件内容
fs.readFile(pathname.substr(1), function (err, data) {
	if (err) {
		res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
		var Web3 = require('web3');
		var web3 = new Web3();
		web3.setProvider(new web3.providers.HttpProvider(hosturl));
		//console.log(web3.eth.coinbase);
		web3.personal.newAccount("equalhappy")
		console.log(web3.eth.accounts[0]);
		console.log(web3.eth.accounts[1]);
		var peerCount = web3.net.peerCount;
		console.log("Peer count: " + peerCount); 
		let log = {
			time:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
			type:"Hello World",
			msg:pathname
		};
		let str = JSON.stringify(log);
		let data = Buffer.from(str).toString('hex');
		data = '0x'+data;
		console.log(data);
		//将数据写入到交易中
		let coinbase = web3.eth.accounts[0];
		let user1 = web3.eth.accounts[1];
		web3.personal.unlockAccount(coinbase, "node1happy");
		let address = web3.eth.sendTransaction({
			from:coinbase,
			to:user1,
			value:'0x00',
			data:data
		});				

		//从交易地址获取数据
		let transaction = web3.eth.getTransaction(address);
		let transactioninfo = JSON.stringify(transaction);
		
		let inputData = transaction.input;
		let res_str = Buffer.from(inputData.replace('0x',''),'hex').toString();
		let res_json = JSON.parse(res_str);
		console.log(transaction);
		console.log(res_json);
		var arr = transactioninfo.split(",");
		var balance = web3.fromWei(web3.eth.getBalance(coinbase),'ether');				
		let blocknum = web3.eth.blockNumber;
		let hiestblock = web3.eth.blockNumber;
		let blockinfo = web3.eth.getBlock(hiestblock);

		res.write('<h2>');
		res.write('当前挖矿帐号为：');
		res.write('</h2>');
		res.write('<p>');
		res.write(coinbase.toString());
		res.write('</p>');
		res.write('<h2>');
		res.write('以太币余额为：');
		res.write('</h1>');
		res.write('<p>');
		res.write(balance.toString());
		res.write('</p>');
		res.write('<h2>');
		res.write('朋友数量为：');
		res.write('</h1>');
		res.write('<p>');
		res.write(peerCount);
		res.write('</p>');
		res.write('<h2>');
		res.write('警讯资料为：');
		res.write('</h1>');
		res.write('<p>');
		res.write(res_str);
		res.write('</p>');
		res.write('<h2>');
		res.write('The Highest BlockNumber：');
		res.write('</h1>');
		res.write('<p>');
		res.write(""+blocknum);
		res.write('</p>');
		res.write('block内资料如下：');
		res.write('</h1>');
		res.write('<p>');
		res.write(blockinfo);
		//res.write(JSON.stringify(arr));
		res.write('</p>');
		res.write('<h2>');

	}else{             
		res.writeHead(200, {'Content-Type': 'text/html'});    
		res.write(data.toString());        
	}
	res.end();
});   