const mysql = require('mysql2');
const { DataTypes } = require('sequelize');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'categories',
    port:'3306'
  });
  
  db.connect((err =>{
    if(err){
      console.log('error')
    }else{
      console.log('success')
    }
  }));
  module.exports=db;

  