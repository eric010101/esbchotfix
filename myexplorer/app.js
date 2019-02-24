const hostconfig = require('./hostconfig');
let hostip = hostconfig.hostip(); // val is ip  
let rpcport_node1 = hostconfig.rpcport_node1(); // rpcport=8544  
let rpcport_node2 = hostconfig.rpcport_node2(); // rpcport=8545 
let rpcport_node3 = hostconfig.rpcport_node3(); // rpcport=8546
let rpcport_node4 = hostconfig.rpcport_node4(); // rpcport=8547
var hosturl = "http://"+hostip+":"+rpcport_node1;

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors')
//app.use(cors()) 

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.get('/', function (req, res) {
   console.log("主页 GET 请求");
   res.send('Hello ESBC');
})

app.get('/node1', function (req, res) {
   console.log("主页 GET 请求");
   res.sendFile( __dirname + "/" + "http2block_node1.js" );
})
app.get('/node2', function (req, res) {
   console.log("主页 GET 请求");
   res.sendFile( __dirname + "/" + "http2block_node2.js" );
})
app.get('/node3', function (req, res) {
   console.log("主页 GET 请求");
   res.sendFile( __dirname + "/" + "http2block_node3s.js" );
})
app.get('/node4', function (req, res) {
   console.log("主页 GET 请求");
   res.sendFile( __dirname + "/" + "http2block_node4.js" );
})
app.get('/iot*', function (req, res) {
   console.log("主页 GET 请求");
   res.sendFile( __dirname + "/" + "iotapi.js" );
})

app.get('/explorer.html', function (req, res) {
    console.log("load explorer.html");
    //res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    //res.setHeader('Access-Control-Allow-Credentials', true);   
    res.sendFile( __dirname + "/" + "myexplorer.html" );
})

 
var server = app.listen(18082, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("访问地址为 http://%s:%s", host, port)
 
})
