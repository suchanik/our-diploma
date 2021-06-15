const mysql = require("mysql2")



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    // password: '1234',
    database: 'epapu',
    insecureAuth : true
});
connection.connect(function (error){
    if(!!error){
        console.log("Database connection error");
        return console.error(error.message);
    }else{
        console.log("Database connected");
    }
});

module.exports  = connection;