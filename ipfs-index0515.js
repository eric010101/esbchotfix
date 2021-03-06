var ipfsClient = require('ipfs-http-client')
var express = require('express')
var fs = require('fs')
var app = express()
var multer  = require('multer')
var moment = require('moment');
//var esbc = require('./ipfs2bc_httpprovider.js');
var AipSpeechClient = require("baidu-aip-sdk").speech;
var APP_ID = "15271707";
var API_KEY = "pRlxjPDqQV8dssspcNIBhoG9";
var SECRET_KEY = "pG7v4PuCiCoTq4EV0bsOKcR5MqAAEhNF";
var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);

const { exec } = require('child_process');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, moment(Date.now()).format('YYYYMMDDHHmmss')+'-' +file.originalname)
  }
})

var upload = multer({ storage: storage })

var ipfs = ipfsClient('localhost', '5001', { protocol: 'http' })
/*
if (esbc.personal.unlockAccount(esbc.eth.accounts[0], 'node1happy')) {
        console.log(esbc.eth.accounts[0] + `is unlocked`);
    }else{
        console.log(`unlock failed`);
}
*/

app.get('/addfile', function(req, res) {
	let testFile = fs.readFileSync("./uploads/t1130.png")
	let testBuffer = Buffer.from(testFile)
    ipfs.add(testBuffer, function (err, file) {
        if (err) {
          console.log(err)
        }
        console.log(file)
      })
})

//Getting the uploaded file via hash code.
app.get('/getfile', function(req, res) {  
    const validCID = req.query.hashcode
    ipfs.get(validCID, function (err, files) {
        files.forEach((file) => {
          console.log(file.path)
          console.log(file.content.toString('utf8'))
        })
	})
})

app.post('/single', upload.single('fileup'), function (req, res, next) {
	//console.log(req.file)
	//console.log(req.file.filename)
	let singlefile = fs.readFileSync("./uploads/"+req.file.filename)
	let filebuffer = Buffer.from(singlefile)
	let mp3str = '.mp3'
	let mp4str = '.mp4'
	let wavtxt = ""
	console.log(req.file.filename.indexOf(mp3str))
	console.log(req.file.filename.indexOf(mp3str) > -1 || req.file.filename.indexOf(mp4str) > -1)
	if(req.file.filename.indexOf(mp3str) > -1 || req.file.filename.indexOf(mp4str) > -1) {
		wavtxt = 'wait'
		console.log('ffmpeg -i ./uploads/'+req.file.filename+' -ar 16000 -ac 1 output.wav')
		exec('ffmpeg -i ./uploads/'+req.file.filename+' -ar 16000 -ac 1 output.wav -y', (err, stdout, stderr) => {
			if (err) {
				// node couldn't execute the command
				return;
			}
			console.log(`stdout: ${stdout}`);
			let voice = fs.readFileSync('./output.wav');
			let voiceBuffer = Buffer.from(voice);
			client.recognize(voiceBuffer, 'wav', 16000).then(function (result) {
				console.log('<recognize1>: ' + JSON.stringify(result))
				console.log(result.result)
				let txtname = req.file.originalname.split(".");
				let data = req.file.originalname+';'+result.result
				console.log(txtname)
				console.log(txtname[0])
				fs.writeFile('/var/www/html/v2t/'+txtname[0]+'.txt', data, function(err, data){
					if (err) console.log(err);
					console.log("Successfully Written to File2.");
				});
			}, function(err) {
				console.log(err)
			})
			console.log(wavtxt)
		  // the *entire* stdout and stderr (buffered)
		  //console.log(`stdout: ${stdout}`);
		  //console.log(`stderr: ${stderr}`);
		});
		
	}
	ipfs.add(filebuffer, function (err, file) {
        if (err) {
          console.log(err)
        }
        //console.log(file)
		//console.log(file[0].hash)
		/*
		let filelog = {
			time:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
			hash:file[0].hash
		};
		//console.log(filelog);
		let filestr = JSON.stringify(filelog);
		let indata = Buffer.from(filestr).toString('hex');
		indata = '0x'+indata;
		let accountsall = esbc.eth.accounts;
		console.log(accountsall.length);
		let user1 = "";
		if (accountsall.length>1)
		{
			user1 = esbc.eth.accounts[1];
		}
		else
		{
			user1 = esbc.personal.newAccount("1234");
			console.log(user1);
		}
		console.log(user1);
		let coinbase = esbc.eth.accounts[0];	
		let address = esbc.eth.sendTransaction({
			from:coinbase,
			to:user1,
			value:esbc.toWei(0.01, 'ether'),
			data:indata
		});
		let transaction = esbc.eth.getTransaction(address);;
		let filehashblockn = esbc.eth.blockNumber + 1;
		*/
		//var iotcb = {"FileHash":file[0].hash,"FilePathBlock":filehashblockn,"Text":wavtxt};
		var iotcb = {"FileHash":file[0].hash,"Text":wavtxt};
		console.log(JSON.stringify(iotcb))
		res.send(JSON.stringify(iotcb));
	})
	
})
app.post('/multifiles', upload.array('fileup', 20), function (req, res, next) {
	console.log(req.files)
	//console.log(req.files[0].filename)
	let singlefile = fs.readFileSync("./uploads/"+req.files[0].filename)
	let filebuffer = Buffer.from(singlefile)
	
	let mp3str = '.mp3'
	let mp4str = '.mp4'
	let wavtxt = ''
	console.log(req.files[0].filename.indexOf(mp3str))
	console.log(req.files[0].filename.indexOf(mp3str) > -1 || req.files[0].filename.indexOf(mp4str) > -1)
	if(req.files[0].filename.indexOf(mp3str) > -1 || req.files[0].filename.indexOf(mp4str) > -1) {
		wavtxt = 'wait'
		console.log('ffmpeg -i ./uploads/'+req.files[0].filename+' -ar 16000 -ac 1 output.wav')
		exec('ffmpeg -i ./uploads/'+req.files[0].filename+' -ar 16000 -ac 1 output.wav -y', (err, stdout, stderr) => {
			if (err) {
				// node couldn't execute the command
				return;
			}
			  // the *entire* stdout and stderr (buffered)
			console.log(`stdout: ${stdout}`);
			  //console.log(`stderr: ${stderr}`);
			let voice = fs.readFileSync('./output.wav');
			let voiceBuffer = Buffer.from(voice);
			client.recognize(voiceBuffer, 'wav', 16000).then(function (result) {
				console.log('<recognize1>: ' + JSON.stringify(result))
				console.log(result.result)
				let txtname = req.files[0].originalname.split(".");
				console.log(txtname)
				console.log(txtname[0])
				let data = req.files[0].originalname+';'+result.result
				
				fs.writeFile('/var/www/html/v2t/'+txtname[0]+'.txt', data, function(err, data){
					if (err) console.log(err);
					console.log("Successfully Written to File2.");
				});
			}, function(err) {
				console.log(err)
			})
		});
		
	}
	
	ipfs.add(filebuffer, function (err, file) {
        if (err) {
          console.log(err)
        }
        //console.log(file)
		//console.log(file[0].hash)
		/*
		let filelog = {
			time:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
			hash:file[0].hash
		};
		//console.log(filelog);
		let filestr = JSON.stringify(filelog);
		let indata = Buffer.from(filestr).toString('hex');
		indata = '0x'+indata;
		let accountsall = esbc.eth.accounts;
		//console.log(accountsall.length);
		let user1 = "";
		if (accountsall.length>1)
		{
			user1 = esbc.eth.accounts[1];
		}
		else
		{
			user1 = esbc.personal.newAccount("1234");
			console.log(user1);
		}
		//console.log(user1);
		let coinbase = esbc.eth.accounts[0];	
		let address = esbc.eth.sendTransaction({
			from:coinbase,
			to:user1,
			value:esbc.toWei(0.01, 'ether'),
			data:indata
		});
		let transaction = esbc.eth.getTransaction(address);;
		let filehashblockn = esbc.eth.blockNumber + 1;
		*/
		//var iotcb = {"FileHash":file[0].hash,"FilePathBlock":filehashblockn,"Text":wavtxt};
		var iotcb = {"FileHash":file[0].hash,"Text":wavtxt};
		console.log(JSON.stringify(iotcb))
		res.send(JSON.stringify(iotcb));
	})
})


app.post('/json', upload.none(), function (req, res, next) {
	console.log(req)
	res.send("json OK");
})

var cpUpload = upload.fields([{ name: 'fileup', maxCount: 1 }, { name: 'fileup', maxCount: 20 }])
app.post('/mixfiles', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
  res.send("mixfiles OK");
})

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("app listening at http://%s:%s", host, port)
})
