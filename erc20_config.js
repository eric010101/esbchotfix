var mysql = require('mysql');  //导入mysql模块
const config = mysql.createPool({
  connectionLimit : 999,
  host: 'localhost',
  user: 'root',
  password: 'sweetekhappy',
  database: 'gogocode_esbc'
});

module.exports = config;