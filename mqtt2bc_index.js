var fs = require('fs');
var esbc = require('./mqtt2bc_httpprovider.js');
var moment = require('moment');
var mqtt = require('mqtt');
var config = require('./mqtt2bc_mysql_config.js');

mqtthost = 'mqtt://149.28.152.45';

var opt = {
	port:1883,
	clientId: 'nodejs',
	username:"username",
	password:"password"
};

var client = mqtt.connect(mqtthost,opt);

if (esbc.personal.unlockAccount(esbc.eth.accounts[0], 'node1happy')) {
        console.log(esbc.eth.accounts[0] + `is unlocked`);
    }else{
        console.log(`unlock failed`);
}

client.on('connect', function () {
	console.log('mqtt server connected');
	client.subscribe('Plant-1/Data/#');
});

client.on('message', function (topic,msg) {
	console.log('topic:'+topic+'; message:'+msg.toString());
	//let iotdatatype = typeof msg;
	//console.log(iotdatatype);
	let obj = JSON.parse(msg.toString());
	console.log(obj.PhoneId);
	let DateTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
	let iotlog = {
		time:DateTime,
		iotdata:obj
	};
	let iotstr = JSON.stringify(iotlog);
	
	let accountsall = esbc.eth.accounts;
	//let iotdatatype = typeof accountsall;
	//console.log(iotdatatype);
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
	let actiontime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

	let indata = Buffer.from(iotstr).toString('hex');
	indata = '0x'+indata;

	let address = esbc.eth.sendTransaction({
		from:coinbase,
		to:user1,
		value:esbc.toWei(0.01, 'ether'),
		data:indata
	});
	let transaction = esbc.eth.getTransaction(address);;
	let hiestblock = esbc.eth.blockNumber;
	
	iotblockn = hiestblock+1;
	//console.log("iotblockn==="+iotblockn);
	config.getConnection(function (err, conn) {
		if (err) throw err;
		console.log("Connected mysql success!");
		//var sql = "INSERT INTO sensor_rawdata (`imei`, `GPS_lat`, `GPS_lon`, `timezone`, `sensor_id`, `sensor_value`, `sensor_unit`, `date_add`, `blockn`) VALUES('"+PhoneId+"','"+GPS_Lat+"','"+GPS_Lon+"','8','"+Sensor_Id+"','"+Value+"','"+Unit+"','"+DateTime+"','"+iotblockn+"')";
		var sql = "INSERT INTO sensor_rawdata (`imei`, `sensor_id`, `sensor_value`, `sensor_unit`, `date_add`, `blockn`) VALUES('"+obj.PhoneId+"','"+obj.Sensor_Id+"','"+obj.Value+"','"+obj.Unit+"','"+DateTime+"','"+iotblockn+"')";
					//console.log(sql);
		conn.query(sql, function (error, results) {
			if (error) throw error;
			console.log("Insert OK !");
			conn.release();
		});
		
	});
	console.log("iotblockn222222==="+iotblockn);
});