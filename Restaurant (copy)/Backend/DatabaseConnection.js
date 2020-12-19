const mysql=require('mysql');

const mysqlConnection= mysql.createConnection({
    host:'localhost',
    user:'Yashasvi',
    password:'d123456',
    database:'CHILLOUT_RESTAURANT',
    multipleStatements:true
})
mysqlConnection.connect();

module.exports=mysqlConnection;