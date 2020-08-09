const sql = require("./../DB/db");
//user object constructor
var Student =function(student){
    
    this.users_id=student.users_id
}
//create user function
Student.AddStudent = function (newStudent,result){
    sql.query("INSERT INTO students set ?",newStudent,function(err,res){
        if(err){
            console.log("error :",err);
            result(err,null);
        }else{
                 console.log(res.insertId);
                result(null, res.insertId);
        }
    });
};
// Token.findOneByToken = function (token, result) {
//     sql.query("Select * from tokens where token = ? ", token, function (err, res) {             
//             if(err) {
//                 console.log("error: ", err);
//                 result(err, null);
//             }
//             else{
//                 result(null, res);
          
//             }
//         });   
// };
// Token.delete = function (userId, result) {
//     sql.query("DELETE from tokens WHERE userId = ?", [userId], function (err, res) {             
//             if(err) {
//                 console.log("error: ", err);
//                 result(err, null);
//             }
//             else{
//                 result(null, res);
          
//             }
//         });   
// };
module.exports= Student;