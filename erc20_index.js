//editor:Sunny
//Creator:EqualSmart
//date:2018-11-22
//version:0.1.1
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var esbc = require('./erc20_httpprovider.js');
var fs = require('fs');
var cors = require('cors');
var moment = require('moment');
var config = require('./erc20_config.js');

//var contractaddr40 = "";
const abi = JSON.parse(fs.readFileSync('./erc20_C001_token_abi.json', 'utf-8'));

if (esbc.personal.unlockAccount(esbc.eth.accounts[0], 'node1happy')) {
        console.log(esbc.eth.accounts[0] + `is unlocked`);
    }else{
        console.log(`unlock failed`);
}

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
   //console.log("request for tokenabi");
	var connected = esbc.isConnected();
	if(!connected){
		console.log("node not connected!");
		var bcinfocbn = {"connected":connected};
		res.send(JSON.stringify(bcinfocbn));
	}else{
		console.log("node connected");
		var blocknum = esbc.eth.blockNumber;
		var peerCount = esbc.net.peerCount;
		//console.log("Peer count: " + peerCount); 
		var listening = esbc.net.listening;
		//console.log("client listening: " + listening);
		var bcinfocb = {"connected":connected,"HighestBlockNumber":blocknum,"peerCount":peerCount,"netListen":listening};
		res.send(JSON.stringify(bcinfocb));
	} 
})
app.post('/erc20', function (req, res) {
	//console.log("request for create");
	//console.log(req);
	let initialSupply = req.body.initialSupply; 
	let tokenName = req.body.tokenName;  
	let tokenSymbol = req.body.tokenSymbol;
	console.log(tokenName);
	let myadvancedtokenContract = esbc.eth.contract(abi)
	console.log(tokenSymbol);
	let myadvancedtoken = myadvancedtokenContract.new(
	   initialSupply,
	   tokenName,
	   tokenSymbol,
	   {
		from: esbc.eth.accounts[0], 
		data: '0x60806040526012600360006101000a81548160ff021916908360ff1602179055503480156200002d57600080fd5b50604051620019d7380380620019d7833981018060405281019080805190602001909291908051820192919060200180518201929190505050828282336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600360009054906101000a900460ff1660ff16600a0a8302600481905550600454600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508160019080519060200190620001259291906200014b565b5080600290805190602001906200013e9291906200014b565b50505050505050620001fa565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200018e57805160ff1916838001178555620001bf565b82800160010185558215620001bf579182015b82811115620001be578251825591602001919060010190620001a1565b5b509050620001ce9190620001d2565b5090565b620001f791905b80821115620001f3576000816000905550600101620001d9565b5090565b90565b6117cd806200020a6000396000f300608060405260043610610128576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806305fefda71461012d57806306fdde0314610164578063095ea7b3146101f457806318160ddd1461025957806323b872dd14610284578063313ce5671461030957806342966c681461033a5780634b7503341461037f57806370a08231146103aa57806379c650681461040157806379cc67901461044e5780638620410b146104b35780638da5cb5b146104de57806395d89b4114610535578063a6f2ae3a146105c5578063a9059cbb146105cf578063b414d4b61461061c578063cae9ca5114610677578063dd62ed3e14610722578063e4849b3214610799578063e724529c146107c6578063f2fde38b14610815575b600080fd5b34801561013957600080fd5b506101626004803603810190808035906020019092919080359060200190929190505050610858565b005b34801561017057600080fd5b506101796108c5565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101b957808201518184015260208101905061019e565b50505050905090810190601f1680156101e65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561020057600080fd5b5061023f600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610963565b604051808215151515815260200191505060405180910390f35b34801561026557600080fd5b5061026e6109f0565b6040518082815260200191505060405180910390f35b34801561029057600080fd5b506102ef600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506109f6565b604051808215151515815260200191505060405180910390f35b34801561031557600080fd5b5061031e610b23565b604051808260ff1660ff16815260200191505060405180910390f35b34801561034657600080fd5b5061036560048036038101908080359060200190929190505050610b36565b604051808215151515815260200191505060405180910390f35b34801561038b57600080fd5b50610394610c3a565b6040518082815260200191505060405180910390f35b3480156103b657600080fd5b506103eb600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c40565b6040518082815260200191505060405180910390f35b34801561040d57600080fd5b5061044c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610c58565b005b34801561045a57600080fd5b50610499600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610dc9565b604051808215151515815260200191505060405180910390f35b3480156104bf57600080fd5b506104c8610fe3565b6040518082815260200191505060405180910390f35b3480156104ea57600080fd5b506104f3610fe9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561054157600080fd5b5061054a61100e565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561058a57808201518184015260208101905061056f565b50505050905090810190601f1680156105b75780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6105cd6110ac565b005b3480156105db57600080fd5b5061061a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506110cc565b005b34801561062857600080fd5b5061065d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506110db565b604051808215151515815260200191505060405180910390f35b34801561068357600080fd5b50610708600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506110fb565b604051808215151515815260200191505060405180910390f35b34801561072e57600080fd5b50610783600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061127e565b6040518082815260200191505060405180910390f35b3480156107a557600080fd5b506107c4600480360381019080803590602001909291905050506112a3565b005b3480156107d257600080fd5b50610813600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803515159060200190929190505050611326565b005b34801561082157600080fd5b50610856600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061144b565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156108b357600080fd5b81600781905550806008819055505050565b60018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561095b5780601f106109305761010080835404028352916020019161095b565b820191906000526020600020905b81548152906001019060200180831161093e57829003601f168201915b505050505081565b600081600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506001905092915050565b60045481565b6000600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610a8357600080fd5b81600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550610b188484846114e9565b600190509392505050565b600360009054906101000a900460ff1681565b600081600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610b8657600080fd5b81600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816004600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff167fcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5836040518082815260200191505060405180910390a260019050919050565b60075481565b60056020528060005260406000206000915090505481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610cb357600080fd5b80600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550806004600082825401925050819055503073ffffffffffffffffffffffffffffffffffffffff1660007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a38173ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b600081600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610e1957600080fd5b600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610ea457600080fd5b81600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816004600082825403925050819055508273ffffffffffffffffffffffffffffffffffffffff167fcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5836040518082815260200191505060405180910390a26001905092915050565b60085481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156110a45780601f10611079576101008083540402835291602001916110a4565b820191906000526020600020905b81548152906001019060200180831161108757829003601f168201915b505050505081565b6000600854348115156110bb57fe5b0490506110c93033836114e9565b50565b6110d73383836114e9565b5050565b60096020528060005260406000206000915054906101000a900460ff1681565b60008084905061110b8585610963565b15611275578073ffffffffffffffffffffffffffffffffffffffff16638f4ffcb1338630876040518563ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825283818151815260200191508051906020019080838360005b838110156112055780820151818401526020810190506111ea565b50505050905090810190601f1680156112325780820380516001836020036101000a031916815260200191505b5095505050505050600060405180830381600087803b15801561125457600080fd5b505af1158015611268573d6000803e3d6000fd5b5050505060019150611276565b5b509392505050565b6006602052816000526040600020602052806000526040600020600091509150505481565b60075481023073ffffffffffffffffffffffffffffffffffffffff1631101515156112cd57600080fd5b6112d83330836114e9565b3373ffffffffffffffffffffffffffffffffffffffff166108fc60075483029081150290604051600060405180830381858888f19350505050158015611322573d6000803e3d6000fd5b5050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561138157600080fd5b80600960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055507f48335238b4855f35377ed80f164e8c6f3c366e54ac00b96a6402d4a9814a03a58282604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001821515151581526020019250505060405180910390a15050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156114a657600080fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60008273ffffffffffffffffffffffffffffffffffffffff161415151561150f57600080fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561155d57600080fd5b600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205481600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054011115156115eb57600080fd5b600960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615151561164457600080fd5b600960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615151561169d57600080fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555080600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050505600a165627a7a723058200e5a1bc8e426311f70f858c5466934d2241280aaec2a91ff1a106bb0ef61c4940029', 
		gas: '4750000'
	   }, function (e, contract){
		//console.log(e, contract);
		if (typeof contract.address !== 'undefined') {
			console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
			//contractaddr40 = contract.address;
			let response = {
				"ERC20_addr":contract.address,
				//"ERC20_abi":abi,
			};
			res.end(JSON.stringify(response));
		}
	});

})
app.get('/erc20', function (req, res) {
	//console.log("request for create");
	//console.log(req);
	let initialSupply = req.query.initialSupply; 
	let tokenName = req.query.tokenName;  
	let tokenSymbol = req.query.tokenSymbol;
	console.log(tokenName);
	let myadvancedtokenContract = esbc.eth.contract(abi)
	console.log(tokenSymbol);
	let myadvancedtoken = myadvancedtokenContract.new(
	   initialSupply,
	   tokenName,
	   tokenSymbol,
	   {
		from: esbc.eth.accounts[0], 
		data: '0x60806040526012600360006101000a81548160ff021916908360ff1602179055503480156200002d57600080fd5b50604051620019d7380380620019d7833981018060405281019080805190602001909291908051820192919060200180518201929190505050828282336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600360009054906101000a900460ff1660ff16600a0a8302600481905550600454600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508160019080519060200190620001259291906200014b565b5080600290805190602001906200013e9291906200014b565b50505050505050620001fa565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200018e57805160ff1916838001178555620001bf565b82800160010185558215620001bf579182015b82811115620001be578251825591602001919060010190620001a1565b5b509050620001ce9190620001d2565b5090565b620001f791905b80821115620001f3576000816000905550600101620001d9565b5090565b90565b6117cd806200020a6000396000f300608060405260043610610128576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806305fefda71461012d57806306fdde0314610164578063095ea7b3146101f457806318160ddd1461025957806323b872dd14610284578063313ce5671461030957806342966c681461033a5780634b7503341461037f57806370a08231146103aa57806379c650681461040157806379cc67901461044e5780638620410b146104b35780638da5cb5b146104de57806395d89b4114610535578063a6f2ae3a146105c5578063a9059cbb146105cf578063b414d4b61461061c578063cae9ca5114610677578063dd62ed3e14610722578063e4849b3214610799578063e724529c146107c6578063f2fde38b14610815575b600080fd5b34801561013957600080fd5b506101626004803603810190808035906020019092919080359060200190929190505050610858565b005b34801561017057600080fd5b506101796108c5565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101b957808201518184015260208101905061019e565b50505050905090810190601f1680156101e65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561020057600080fd5b5061023f600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610963565b604051808215151515815260200191505060405180910390f35b34801561026557600080fd5b5061026e6109f0565b6040518082815260200191505060405180910390f35b34801561029057600080fd5b506102ef600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506109f6565b604051808215151515815260200191505060405180910390f35b34801561031557600080fd5b5061031e610b23565b604051808260ff1660ff16815260200191505060405180910390f35b34801561034657600080fd5b5061036560048036038101908080359060200190929190505050610b36565b604051808215151515815260200191505060405180910390f35b34801561038b57600080fd5b50610394610c3a565b6040518082815260200191505060405180910390f35b3480156103b657600080fd5b506103eb600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c40565b6040518082815260200191505060405180910390f35b34801561040d57600080fd5b5061044c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610c58565b005b34801561045a57600080fd5b50610499600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610dc9565b604051808215151515815260200191505060405180910390f35b3480156104bf57600080fd5b506104c8610fe3565b6040518082815260200191505060405180910390f35b3480156104ea57600080fd5b506104f3610fe9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561054157600080fd5b5061054a61100e565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561058a57808201518184015260208101905061056f565b50505050905090810190601f1680156105b75780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6105cd6110ac565b005b3480156105db57600080fd5b5061061a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506110cc565b005b34801561062857600080fd5b5061065d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506110db565b604051808215151515815260200191505060405180910390f35b34801561068357600080fd5b50610708600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506110fb565b604051808215151515815260200191505060405180910390f35b34801561072e57600080fd5b50610783600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061127e565b6040518082815260200191505060405180910390f35b3480156107a557600080fd5b506107c4600480360381019080803590602001909291905050506112a3565b005b3480156107d257600080fd5b50610813600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803515159060200190929190505050611326565b005b34801561082157600080fd5b50610856600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061144b565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156108b357600080fd5b81600781905550806008819055505050565b60018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561095b5780601f106109305761010080835404028352916020019161095b565b820191906000526020600020905b81548152906001019060200180831161093e57829003601f168201915b505050505081565b600081600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506001905092915050565b60045481565b6000600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610a8357600080fd5b81600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550610b188484846114e9565b600190509392505050565b600360009054906101000a900460ff1681565b600081600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610b8657600080fd5b81600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816004600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff167fcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5836040518082815260200191505060405180910390a260019050919050565b60075481565b60056020528060005260406000206000915090505481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610cb357600080fd5b80600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550806004600082825401925050819055503073ffffffffffffffffffffffffffffffffffffffff1660007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a38173ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b600081600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610e1957600080fd5b600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610ea457600080fd5b81600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816004600082825403925050819055508273ffffffffffffffffffffffffffffffffffffffff167fcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5836040518082815260200191505060405180910390a26001905092915050565b60085481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156110a45780601f10611079576101008083540402835291602001916110a4565b820191906000526020600020905b81548152906001019060200180831161108757829003601f168201915b505050505081565b6000600854348115156110bb57fe5b0490506110c93033836114e9565b50565b6110d73383836114e9565b5050565b60096020528060005260406000206000915054906101000a900460ff1681565b60008084905061110b8585610963565b15611275578073ffffffffffffffffffffffffffffffffffffffff16638f4ffcb1338630876040518563ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825283818151815260200191508051906020019080838360005b838110156112055780820151818401526020810190506111ea565b50505050905090810190601f1680156112325780820380516001836020036101000a031916815260200191505b5095505050505050600060405180830381600087803b15801561125457600080fd5b505af1158015611268573d6000803e3d6000fd5b5050505060019150611276565b5b509392505050565b6006602052816000526040600020602052806000526040600020600091509150505481565b60075481023073ffffffffffffffffffffffffffffffffffffffff1631101515156112cd57600080fd5b6112d83330836114e9565b3373ffffffffffffffffffffffffffffffffffffffff166108fc60075483029081150290604051600060405180830381858888f19350505050158015611322573d6000803e3d6000fd5b5050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561138157600080fd5b80600960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055507f48335238b4855f35377ed80f164e8c6f3c366e54ac00b96a6402d4a9814a03a58282604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001821515151581526020019250505060405180910390a15050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156114a657600080fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60008273ffffffffffffffffffffffffffffffffffffffff161415151561150f57600080fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561155d57600080fd5b600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205481600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054011115156115eb57600080fd5b600960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615151561164457600080fd5b600960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615151561169d57600080fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555080600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050505600a165627a7a723058200e5a1bc8e426311f70f858c5466934d2241280aaec2a91ff1a106bb0ef61c4940029', 
		gas: '4750000'
	   }, function (e, contract){
		//console.log(e, contract);
		if (typeof contract.address !== 'undefined') {
			console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
			//contractaddr40 = contract.address;
			let response = {
				"ERC20_addr":contract.address,
				//"ERC20_abi":abi,
			};
			res.end(JSON.stringify(response));
		}
	});

})

app.get('/', function (req, res) {
	//console.log("request for tokenabi");
	var connected = esbc.isConnected();
	if(!connected){
		console.log("node not connected!");
		var bcinfocbn = {"connected":connected};
		res.send(JSON.stringify(bcinfocbn));
	}else{
		console.log("node connected");
		var blocknum = esbc.eth.blockNumber;
		var peerCount = esbc.net.peerCount;
		//console.log("Peer count: " + peerCount); 
		var listening = esbc.net.listening;
		//console.log("client listening: " + listening);
		var bcinfocb = {"connected":connected,"HighestBlockNumber":blocknum,"peerCount":peerCount,"netListen":listening};
		res.send(JSON.stringify(bcinfocb));
	}
})
app.get('/net', function (req, res) {
	//console.log("request for tokenabi");
	var connected = esbc.isConnected();
	if(!connected){
		console.log("node not connected!");
		var bcinfocbn = {"connected":connected};
		res.send(JSON.stringify(bcinfocbn));
	}else{
		console.log("node connected");
		var blocknum = esbc.eth.blockNumber;
		var peerCount = esbc.net.peerCount;
		//console.log("Peer count: " + peerCount); 
		var listening = esbc.net.listening;
		//console.log("client listening: " + listening);
		var bcinfocb = {"connected":connected,"HighestBlockNumber":blocknum,"peerCount":peerCount,"netListen":listening};
		res.send(JSON.stringify(bcinfocb));
	}
})

app.get('/orgacc*', function (req, res) {
	let hostip = req.query.host;
	console.log(hostip);
	//let coinbase = esbc.eth.coinbase;
	let acc40s = esbc.eth.accounts;
	let orgacccb = {"Accounts":acc40s};
	res.send(JSON.stringify(orgacccb));
	/*
	config.getConnection(function (err, conn) {
		if (err) throw err;
		console.log("Connected mysql success!");

		var sql2 = "SELECT ACC40 FROM esbc_host_applog where HOST_IP like '"+hostip+"' ORDER BY Modify_Date DESC LIMIT 1";
		console.log(sql2);
		conn.query(sql2, function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			var bcinfocb = result;
			conn.release();
			res.send(JSON.stringify(bcinfocb));
		});
	});
	*/
})

app.get('/newacc', function (req, res) {
	let pwd = req.query.pwd;
	let newAccount = esbc.personal.newAccount();
	console.log(newAccount)
	let accbc = {"newAccount":newAccount};
	res.send(JSON.stringify(accbc));
})

app.post('/balall', function (req, res) {
	let erc20addr = req.body.erc20addr;
	let acc40 = req.body.acc40;
	console.log(erc20addr)
	console.log(acc40)
	let coinbalance = esbc.eth.getBalance(acc40);
	let myadvancedtokenContract = esbc.eth.contract(abi);
	let myContract = myadvancedtokenContract.at(erc20addr);
	let erc20balance = myContract.balanceOf.call(acc40);
	/*
	var erc20name = myContract.methods.tokenName().call(function(err, res){
		console.log(res); 
	});
	var erc20symbol = myContract.methods.tokenSymbol().call(function(err, res){
		console.log(res); 
	});
	
	var erc20name = myContract.tokenName().then(function (result) {
		console.log(result);
	});
	var erc20symbol = myContract.tokenSymbol().then(function (result) {
		console.log(result);
	});
	*/
	let response = {
		"Coin Account":acc40,
		"Coin Balance":coinbalance,
		"ERC20Token Account":erc20addr,
		"ERC20Token Balance":erc20balance
		//"erc20name":erc20name,
		//"erc20symbol":erc20symbol
	};
	console.log(response);
	res.end(JSON.stringify(response));
})
app.post('/balcoin', function (req, res) {
	let acc40 = req.body.acc40;
	console.log(acc40)
	let coinbalance = esbc.eth.getBalance(acc40);

	let response = {
		"Coin Account":acc40,
		"Coin Balance":coinbalance
		//"erc20name":erc20name,
		//"erc20symbol":erc20symbol
	};
	console.log(response);
	res.end(JSON.stringify(response));
})

app.post('/txcoin', function (req, res) {
	let accfrom = req.body.accfrom;
	let accto = req.body.accto;
	let accfrompwd = req.body.accfrompwd;
	let txvalue = req.body.txvalue;
	let txlog = {
		type:"Coin Tx"
	}
	let txstr = JSON.stringify(txlog);
	let indata = Buffer.from(txstr).toString('hex');
	indata = '0x'+indata;
	//console.log(accfrom);
	//console.log(accto);
	//console.log(accfrompwd);
	//console.log(txvalue);
	esbc.personal.unlockAccount(accfrom, accfrompwd,20);
	//console.log(user1);
	//console.log(indata);
	//var balance0 = web3.fromWei(web3.eth.getBalance(coinbase),'ether');	
	let address = esbc.eth.sendTransaction({
		from:accfrom,
		to:accto,
		value:esbc.toWei(txvalue, 'ether'),
		data:indata
	});
	//let transaction = esbc.eth.getTransaction(address);;
	let hiestblock = esbc.eth.blockNumber;
	//let blockinfo = esbc.eth.getBlock(hiestblock);
	//var iotcb = {"address":address,"account":user1,"iotdata":iotstr,"HighestBlock":hiestblock,"BlockInfo":blockinfo,"IoT2Block":transaction};
	let response = {
		"Account From":accfrom,
		"Account To":accto,
		"Transaction Value":txvalue,
		"Transaction Block Number":hiestblock+1
	};
	console.log(response);
	res.end(JSON.stringify(response));
})

app.post('/txerc20', function (req, res) {
	let accfrom = req.body.accfrom;
	let accto = req.body.accto;
	let accfrompwd = req.body.accfrompwd;
	let txvalue = req.body.txvalue;
	let erc20addr = req.body.erc20addr;
	//console.log(accfrom);
	//console.log(accto);
	//console.log(accfrompwd);
	//console.log(txvalue);
	//console.log(erc20addr);
	let myadvancedtokenContract = esbc.eth.contract(abi);
	
	let myContract = myadvancedtokenContract.at(erc20addr);
	
	esbc.personal.unlockAccount(accfrom, accfrompwd,20);
	let txstatus = myContract.transfer(accto, txvalue, { from: accfrom });
	console.log(txstatus);
	let acc40frombalance = myContract.balanceOf.call(accfrom);
	let hiestblock = esbc.eth.blockNumber;
	let response = {
		"Account From":accfrom,
		"Account To":accto,
		"Transaction Value":txvalue,
		"Transaction Block Number":hiestblock+1
	};
	console.log(response);
	res.end(JSON.stringify(response));
})

app.get('/iottx*', function (req, res) {
	//console.log(req);
	let obj = JSON.parse(req.query.iotdata);
	let iotlog = {
		time:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
		deviceid:req.query.deviceid,
		account:req.query.account,
		iotdata:obj,
		type:"Retail"
	};
	//console.log(iotlog);
	let iotstr = JSON.stringify(iotlog);
	let indata = Buffer.from(iotstr).toString('hex');
	indata = '0x'+indata;
	let coinbase = esbc.eth.accounts[0];
	let user1 = req.body.account;
	//esbc.personal.unlockAccount(coinbase, "node2happy",20);
	//console.log(user1);
	//console.log(indata);
	//var balance0 = web3.fromWei(web3.eth.getBalance(coinbase),'ether');	
	let address = esbc.eth.sendTransaction({
		from:coinbase,
		to:user1,
		value:esbc.toWei(0.01, 'ether'),
		data:indata
	});
	let transaction = esbc.eth.getTransaction(address);;
	let hiestblock = esbc.eth.blockNumber;
	let blockinfo = esbc.eth.getBlock(hiestblock);
	//var iotcb = {"address":address,"account":user1,"iotdata":iotstr,"HighestBlock":hiestblock,"BlockInfo":blockinfo,"IoT2Block":transaction};
	var iotcb = {"txHash":address,"account":user1,"iotdata":iotstr,"HighestBlock":hiestblock};
	res.send(JSON.stringify(iotcb));
})
app.post('/iottx*', function (req, res) {
	//console.log(req);
	let obj = JSON.parse(req.body.iotdata);
	let iotlog = {
		time:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
		deviceid:req.body.deviceid,
		account:req.body.account,
		iotdata:obj,
		type:"Retail"
	};
	//console.log(iotlog);
	let iotstr = JSON.stringify(iotlog);
	let indata = Buffer.from(iotstr).toString('hex');
	indata = '0x'+indata;
	let coinbase = esbc.eth.accounts[0];
	let user1 = req.body.account;
	//esbc.personal.unlockAccount(coinbase, "node2happy",20);
	//console.log(user1);
	//console.log(indata);
	//var balance0 = web3.fromWei(web3.eth.getBalance(coinbase),'ether');	
	let address = esbc.eth.sendTransaction({
		from:coinbase,
		to:user1,
		value:esbc.toWei(0.01, 'ether'),
		data:indata
	});
	let transaction = esbc.eth.getTransaction(address);;
	let hiestblock = esbc.eth.blockNumber;
	let blockinfo = esbc.eth.getBlock(hiestblock);
	//var iotcb = {"address":address,"account":user1,"iotdata":iotstr,"HighestBlock":hiestblock,"BlockInfo":blockinfo,"IoT2Block":transaction};
	var iotcb = {"txHash":address,"account":user1,"iotdata":iotstr,"HighestBlock":hiestblock};
	res.send(JSON.stringify(iotcb));
})

app.get('/iotstore', function (req, res) {
	//console.log(req);
	let obj = JSON.parse(req.query.iotdata);
	let iotlog = {
		time:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
		deviceid:req.query.deviceid,
		account:req.query.account,
		iotdata:obj,
		type:"IoT"
	};
	//let obj = JSON.parse(req.query.iotdata);
	//let iotdatatype = typeof obj;
	//console.log(iotdatatype);
	let iotblockn = 0;
	for (var i = 0; i < obj.length; i++) {
		let PhoneId = obj[i].PhoneId;
		let Sensor_Type = obj[i].Sensor_Type;
		let GPS_Lat = obj[i].GPS_Lat;
		let GPS_Lon = obj[i].GPS_Lon;
		let Sensor_Id = obj[i].Sensor_Id;
		let Value = obj[i].Value;
		let Unit = obj[i].Unit;
		//let DateTime = obj[i].DateTime;
		let DateTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		console.log(PhoneId);
		console.log(Sensor_Type);
		console.log(Sensor_Id);
		console.log(Value);
		console.log(DateTime);
		
		let iotstr = JSON.stringify(iotlog);
		let indata = Buffer.from(iotstr).toString('hex');
		indata = '0x'+indata;
		let coinbase = esbc.eth.accounts[0];
		let user1 = req.query.account;
		//esbc.personal.unlockAccount(coinbase, "node2happy",20);
		//console.log(user1);
		//console.log(indata);
		//var balance0 = web3.fromWei(web3.eth.getBalance(coinbase),'ether');	
		let address = esbc.eth.sendTransaction({
			from:coinbase,
			to:user1,
			value:esbc.toWei(0.01, 'ether'),
			data:indata
		});
		let transaction = esbc.eth.getTransaction(address);;
		let hiestblock = esbc.eth.blockNumber;
		//let blockinfo = esbc.eth.getBlock(hiestblock);
		
		iotblockn = hiestblock+1;
		//console.log("iotblockn==="+iotblockn);
		config.getConnection(function (err, conn) {
			if (err) throw err;
			console.log("Connected mysql success!");
			
			var sql = "INSERT INTO sensor_rawdata (`imei`, `GPS_lat`, `GPS_lon`, `timezone`, `sensor_id`, `sensor_value`, `sensor_unit`, `date_add`, `blockn`) VALUES('"+PhoneId+"','"+GPS_Lat+"','"+GPS_Lon+"','8','"+Sensor_Id+"','"+Value+"','"+Unit+"','"+DateTime+"','"+iotblockn+"')";
						//console.log(sql);
			conn.query(sql, function (error, results) {
				if (error) throw error;
				console.log("Insert OK !");
				conn.release();
			});
		});
	}
	//console.log("iotblockn222222==="+iotblockn);
	var iotcb = {"iotdata":iotlog,"iotBlock":iotblockn};
	res.send(JSON.stringify(iotcb));
})

app.post('/iotstore', function (req, res) {
	//console.log(req);
	let obj = JSON.parse(req.body.iotdata);
	let iotlog = {
		time:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
		deviceid:req.body.deviceid,
		account:req.body.account,
		iotdata:obj,
		type:"IoT"
	};
	//let iotdatatype = typeof req.body.iotdata;
	//let phoneid = req.body.iotdata.PhoneId
	
	//console.log(iotlog);
	//let iotdatatype = typeof obj;
	//console.log(iotdatatype);
	let iotblockn = 0;
	for (var i = 0; i < obj.length; i++) {
		let PhoneId = obj[i].PhoneId;
		let Sensor_Type = obj[i].Sensor_Type;
		let GPS_Lat = obj[i].GPS_Lat;
		let GPS_Lon = obj[i].GPS_Lon;
		let Sensor_Id = obj[i].Sensor_Id;
		let Value = obj[i].Value;
		let Unit = obj[i].Unit;
		let DateTime = obj[i].DateTime;
		console.log(PhoneId);
		console.log(Sensor_Type);
		console.log(Sensor_Id);
		console.log(Value);
		console.log(DateTime);
		//console.log(iotlog);
		let iotstr = JSON.stringify(iotlog);
		let indata = Buffer.from(iotstr).toString('hex');
		indata = '0x'+indata;
		let coinbase = esbc.eth.accounts[0];
		let user1 = req.body.account;
		let address = esbc.eth.sendTransaction({
			from:coinbase,
			to:user1,
			value:esbc.toWei(0.01, 'ether'),
			data:indata
		});
		let transaction = esbc.eth.getTransaction(address);;
		let hiestblock = esbc.eth.blockNumber;
		//let blockinfo = esbc.eth.getBlock(hiestblock);
		let bcntype = typeof hiestblock;
		//console.log(bcntype);
		//console.log(hiestblock.toString());
		
		iotblockn = hiestblock+1;
		//console.log("iotblockn==="+iotblockn);
		config.getConnection(function (err, conn) {
			if (err) throw err;
			console.log("Connected mysql success!");
			
			var sql = "INSERT INTO sensor_rawdata (`imei`, `GPS_lat`, `GPS_lon`, `timezone`, `sensor_id`, `sensor_value`, `sensor_unit`, `date_add`, `blockn`) VALUES('"+PhoneId+"','"+GPS_Lat+"','"+GPS_Lon+"','8','"+Sensor_Id+"','"+Value+"','"+Unit+"','"+DateTime+"','"+iotblockn+"')";
						//console.log(sql);
			conn.query(sql, function (error, results) {
				if (error) throw error;
				console.log("Insert OK !");
				conn.release();
			});
		});
	}
	//console.log("iotblockn222222==="+iotblockn);
	var iotcb = {"iotdata":iotlog,"iotBlock":iotblockn};
	res.send(JSON.stringify(iotcb));
})

var server = app.listen(22000, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
