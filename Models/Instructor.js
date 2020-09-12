const sql = require("./../DB/db");
//user object constructor
var Instructor =function(instructor){
    
    this.instructors_id	=instructor.instructors_id	,
    this.description=instructor.description,
    this.qualification=instructor.qualification
}
//create user function
Instructor.AddInstructor = function (newInstructor,result){
    sql.query("INSERT INTO instructors set ?",newInstructor,function(err,res){
        if(err){
            console.log("error :",err);
            result(err,null);
        }else{
                 console.log(res.insertId);
                result(null, res.insertId);
        }
    });
};
 Instructor.findOneByuserID = function (userID, result) {
    sql.query("Select * from instructors where instructors_id	 = ? ", userID, function (err, res) {             
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
Instructor.getAllInstructors = function (result) {
    sql.query("Select u.username,u.fullname,u.email,u.image,u.address,u.tel,u.isVerified From users u INNER JOIN instructors i ON (u.id = i.instructors_id);", function (err, res) {

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

module.exports= Instructor;