
const sql = require("./../DB/db");
//user object constructor
var Token =function(token){
    this.token=token.token,
    this.userId=token.userId
}
//create user function
Token.CreateToken = function (newToken,result){
    sql.query("INSERT INTO tokens set ?",newToken,function(err,res){
        if(err){
            console.log("error :",err);
            result(err,null);
        }else{
                 console.log(res.insertId);
                result(null, res.insertId);
        }
    });
};
Token.findOneByToken = function (token, result) {
    sql.query("Select * from tokens where token = ? ", token, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};
Token.delete = function (userId, result) {
    sql.query("DELETE from tokens WHERE userId = ?", [userId], function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};
module.exports= Token;