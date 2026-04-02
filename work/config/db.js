const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'school'
});
db.connect((err) => {
    if(err){
        console.log('error occured');
      return;
    } 
    console.log('databse connected');
})

module.exports = db;