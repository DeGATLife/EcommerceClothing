'user strict';
const sql = require("./../DB/db");
//user object constructor
var User =function(user){
    this.username=user.username,
    this.fullname=user.fullname,
    this.email=user.email,
    this.password=user.password,
    this.address=user.address,
    this.country=user.country,
    this.image=user.image,
    this.tel=user.tel,
    this.isVerified=false
}
//create user function
User.CreateUser = function (newUser,result){
    sql.query("INSERT INTO users set ?",newUser,function(err,res){
        if(err){
            console.log("error :",err);
            result(err,null);
        }else{
                 console.log(res.insertId);
                result(null, res.insertId);
        }
    });
};
User.getUserById = function (userId, result) {
    sql.query("Select * from users where id = ? ", userId, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};

User.getUserByEmail = function (userEmail, result) {
    sql.query("Select * from users where email = ? ", userEmail, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};
User.getUserByUsername = function (Username, result) {
    sql.query("Select * from users where username = ? ", Username, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};

User.getAllUser = function (result) {
    sql.query("Select * from users", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(err,null);
            }
            else{
              console.log('users : ', res);  

             result(null, res);
            }
        });   
};
User.updateUsername = function(id, Username, result){
sql.query("UPDATE users SET username = ? WHERE id = ?", [Username, id], function (err, res) {
      if(err) {
          console.log("error: ", err);
            result(null, err);
         }
       else{   
         result(null, res);
            }
        }); 
};
User.Verify = function(id,verify, result){
    sql.query("UPDATE users SET isVerified = ? WHERE id = ?", [verify, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(err, null);
             }
           else{   
             result(null, res);
                }
            }); 
    };
 User.Banne = function(id,banne, result){
        sql.query("UPDATE users SET isVerified = ? WHERE id = ?", [banne, id], function (err, res) {
              if(err) {
                  console.log("error: ", err);
                    result(err, null);
                 }
               else{   
                 result(null, res);
                    }
                }); 
        };
User.updateEmail = function(id, Email, result){
    sql.query("UPDATE users SET email = ? WHERE id = ?", [Email, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
User.updatePassword = function(id, Password, result){
    sql.query("UPDATE users SET password = ? WHERE id = ?", [Password, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
User.updateAddress = function(id, Address, result){
sql.query("UPDATE users SET address = ? WHERE id = ?", [Address, id], function (err, res) {
      if(err) {
          console.log("error: ", err);
            result(null, err);
         }
       else{   
         result(null, res);
            }
        }); 
};
User.updateTel = function(id, PhNbr, result){
    sql.query("UPDATE users SET tel = ? WHERE id = ?", [PhNbr, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
User.updateImage = function(id, Image, result){
    sql.query("UPDATE users SET image = ? WHERE id = ?", [Image, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
User.updateCountry = function(id, Country, result){
    sql.query("UPDATE users SET country = ? WHERE id = ?", [Country, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
User.delete = function (userId, result) {
    sql.query("DELETE from users WHERE id = ?", [userId], function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};
module.exports= User;