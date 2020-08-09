const mysql=require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "Mumonuski",
    password: "mawkli",
    database: "mydb"
  });
  connection.connect(function(err) {
    if (err) throw err;
    else
    console.log("database connected");
});

module.exports = connection;