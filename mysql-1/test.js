const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '192.168.99.100',
    user: 'root',
    password: '123456',
    port: '3306'
});
// 连接mysql服务器
connection.connect();
// 1. 创建数据库
connection.query('CREATE DATABASE IF NOT EXISTS node_mysql_test DEFAULT CHARSET utf8mb4;', function (error, results, fields) {
    if (error) throw error;
    console.log('创建数据库', results)
});
// 2. 创建表
connection.query('use node_mysql_test;');
connection.query(`CREATE TABLE IF NOT EXISTS user(name text,age int)`, function (error, results, fields) {
    if (error) throw error;
    console.log('创建表数据', results)
});

connection.end();