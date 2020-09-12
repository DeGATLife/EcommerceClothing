const sql = require("./../DB/db");
//user object constructor
var Admin =function(admin){
    this.admins_id	=admin.admins_id	
}
//create user function
Admin.AddAdmin = function (newAdmin,result){
    sql.query("INSERT INTO admins set ?",newAdmin,function(err,res){
        if(err){
            console.log("error :",err);
            result(err,null);
        }else{
                 console.log(res.insertId);
                result(null, res.insertId);
        }
    });
};
 Admin.findOneByuserID = function (userID, result) {
    sql.query("Select * from admins where admins_id	 = ? ", userID, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res);
                result(null, res);
          
            }
        });   
};

module.exports= Admin;