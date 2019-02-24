var Web3 = require('web3');
var esbc = new Web3();
const ethuri = 'http://localhost:8544';
esbc.setProvider(new esbc.providers.HttpProvider(ethuri));
if(!esbc.isConnected()){
    throw new Error('unable to connect to ethereum node at ' + ethuri);
}else{
    console.log('connected to ehterum node at ' + ethuri);
}
module.exports = esbc;