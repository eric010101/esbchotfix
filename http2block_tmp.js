var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var moment = require('moment');

var server = http.createServer().listen($nodejsport$);

server.on('request', function(req, res) {
	if (req.method == 'POST') {
		var body = '';
		req.on('data', function (data) {
			body +=data;
			console.log("Partical body:" + body);
		});
		req.on('end',function() {
			var post = querystring.parse(body);
			console.log(post);
		});
		res.writeHead(200,{'Content-Type': 'text/plain'});
		res.end('Hello Sunny\n');
	}
	else
	{
		var urlObject = url.parse(req.url, true, false);
		var hostName = urlObject.hostname;
		console.log("Host Name : " + hostName);

		var path = urlObject.path;
		console.log("Path : " + path);

// Query string is a JSON object.
		var queryStringObject = urlObject.query;
		console.log("Query String : " + JSON.stringify(queryStringObject));
		
		var pathname = url.parse(req.url).pathname;
   		// 输出请求的文件名
   		console.log("Request for " + pathname + " received.");
   		// 从文件系统中读取请求的文件内容
   		fs.readFile(pathname.substr(1), function (err, data) {
      			if (err) {
         			//console.log(err);
         			// HTTP 状态码: 404 : NOT FOUND
         			// Content Type: text/plain
         			//res.writeHead(404, {'Content-Type': 'text/html'});
				res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
				var Web3 = require('web3');
				var web3 = new Web3();
				web3.setProvider(new web3.providers.HttpProvider('http://$ip$:$rpcport$'));
				//console.log(web3.eth.coinbase);
				web3.personal.newAccount("equalhappy")
				console.log(web3.eth.accounts[0]);
				console.log(web3.eth.accounts[1]);
				let log = {
				    time:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
				    type:"Alarm",
				    msg:pathname
				};
				let str = JSON.stringify(log);
				let data = Buffer.from(str).toString('hex');
				data = '0x'+data;
				console.log(data);
				//将数据写入到交易中
				let coinbase = web3.eth.accounts[0];
				let user1 = web3.eth.accounts[1];
				web3.personal.unlockAccount(coinbase, "$pw_array$");
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

				res.write('<h2>');
				res.write('当前发送交易的帐号为：');
				res.write('</h1>');
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
				res.write('警讯资料为：');
				res.write('</h1>');
				res.write('<p>');
				res.write(res_str);
				res.write('</p>');
				res.write('<h2>');
				res.write('block内资料如下：');
				res.write('</h1>');
				res.write('<p>');
				//res.write(transactioninfo);
				res.write(JSON.stringify(arr));
				res.write('</p>');
				res.write('<h2>');
				res.write('The Highest BlockNumber：');
				res.write('</h1>');
				res.write('<p>');
				res.write(""+blocknum);
				res.write('</p>');


			}else{             
         			// HTTP 状态码: 200 : OK
         			// Content Type: text/plain
         			res.writeHead(200, {'Content-Type': 'text/html'});    
         
         			// 响应文件内容
         			res.write(data.toString());        
      			}
      			//  发送响应数据
      			res.end();
   		});   
	}

});

console.log('listening on port $nodejsport$');
