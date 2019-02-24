
const hostconfig = require('./hostconfig');
let hostip = hostconfig.hostip(); // val is ip  
let rpcport_node1 = hostconfig.rpcport_node1(); // rpcport=8544  
let rpcport_node2 = hostconfig.rpcport_node2(); // rpcport=8545 
let rpcport_node3 = hostconfig.rpcport_node3(); // rpcport=8546
let rpcport_node4 = hostconfig.rpcport_node4(); // rpcport=8547
var hosturl = "http://"+hostip+":"+rpcport_node1;

var url = require('url');
var querystring = require('querystring');
var moment = require('moment');

var urlObject = url.parse(req.url, true, false);
var path = urlObject.path;
console.log("Path : " + path);
var pathname = urlObject.pathname;
console.log("Pathname : " + pathname);
// Query string is a JSON object.
var queryStringObject = urlObject.query;
console.log("Query String : " + JSON.stringify(queryStringObject));
//res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
var Web3 = require('web3');
var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider(hosturl));

if('/bcinfo' == pathname){
	var connected = web3.isConnected();
	if(!connected){
		console.log("node not connected!");
		var bcinfocbn = {"connected":connected};
		res.write(JSON.stringify(bcinfocbn));
	}else{
		console.log("node connected");
		var blocknum = web3.eth.blockNumber;
		var peerCount = web3.net.peerCount;
		console.log("Peer count: " + peerCount); 
		var listening = web3.net.listening;
		console.log("client listening: " + listening);
		var bcinfocb = {"connected":connected,"BlockNumber":blocknum,"peerCount":peerCount,"netListen":listening};
		res.write(JSON.stringify(bcinfocb));
	}
}
if('/newacc40' == pathname){
	var newAccount = web3.personal.newAccount(queryStringObject.deviceid);
	console.log(newAccount)
	var accbc = {"newAccount":newAccount};
	res.write(JSON.stringify(accbc));
}
if('/accs' == pathname){
	var accs = web3.eth.accounts;
	console.log(accs)
	var signerbc = {"accounts":accs};
	res.write(JSON.stringify(signerbc));
}
if('/balance' == pathname){
	var accounts = queryStringObject.account;
	console.log("account : " +accounts );
	var balance = web3.eth.getBalance(accounts);
	console.log(balance.toString(10));
	var balabc = {"balance":balance.toString(10)};
	res.write(JSON.stringify(balabc));
}
if('/tran' == pathname){
	let log = {
		time:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
		deviceid:queryStringObject.deviceid,
		account:queryStringObject.account
	};
	let str = JSON.stringify(log);
	let data = Buffer.from(str).toString('hex');
	data = '0x'+data;
	let coinbase = web3.eth.accounts[0];
	let user1 = queryStringObject.account;
	web3.personal.unlockAccount(coinbase, "node1happy",20);
	//var balance0 = web3.fromWei(web3.eth.getBalance(coinbase),'ether');	
	let address = web3.eth.sendTransaction({
		from:coinbase,
		to:user1,
		value:'0x100000000',
		data:data
	});
	var trancb = {"address":address,"account":user1,"Info":str};
	res.write(JSON.stringify(trancb));
}
if('/iot' == pathname){
	let iotlog = {
		time:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
		deviceid:queryStringObject.deviceid,
		account:queryStringObject.account,
		iotdata:queryStringObject.iotdata
	};
	let iotstr = JSON.stringify(iotlog);
	let indata = Buffer.from(iotstr).toString('hex');
	indata = '0x'+indata;
	let coinbase = web3.eth.accounts[0];
	let user1 = queryStringObject.account;
	web3.personal.unlockAccount(coinbase, "node1happy",20);
	//var balance0 = web3.fromWei(web3.eth.getBalance(coinbase),'ether');	
	let address = web3.eth.sendTransaction({
		from:coinbase,
		to:user1,
		value:'0x100000000',
		data:iotstr
	});
	let transaction = web3.eth.getTransaction(address);;
	let hiestblock = web3.eth.blockNumber;
	let blockinfo = web3.eth.getBlock(hiestblock);
	var iotcb = {"address":address,"account":user1,"iotdata":iotstr,"HighestBlock":hiestblock,"BlockInfo":blockinfo,"IoT2Block":transaction};
	res.write(JSON.stringify(iotcb));
}

res.end();
