const sql = require("./../DB/db");
//user object constructor
var Formation_has_student =function(formation_has_student){
    this.formations_id=formation_has_student.name_fr,
    this.students_id=formation_has_student.name_eng,
    this.percentage=formation_has_student.percentage,
    this.bookmark=formation_has_student.bookmark
}
//create user function
Formation_has_student.CreateFormation = function (newFormation,result){
    sql.query("INSERT INTO formation_has_students set ?",newFormation,function(err,res){
        if(err){
            console.log("error :",err);
            result(err,null);
        }else{
                 console.log(res.insertId);
                result(null, res.insertId);
        }
    });
};
Formation_has_student.getFormationOFstudent = function (studentId, result) {
    sql.query("Select * from formation_has_students where students_id = ? ", studentId, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};


Formation_has_student.getAllStudentsFormation = function (formationID,result) {
    sql.query("Select * from formation_has_students where formations_id = ?",formationID, function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
              console.log('students : ', res);  

             result(null, res);
            }
        });   
};
Formation_has_student.updateBookmark = function(formationId,studentId, bookmark, result){
sql.query("UPDATE formation_has_students SET bookmark = ? WHERE (students_id = ? AND formations_id= ?)", [bookmark, studentId,formationId], function (err, res) {
      if(err) {
          console.log("error: ", err);
            result(err,null);
         }
       else{   
         result(null, res);
            }
        }); 
};
Formation_has_student.updatePercentage = function(formationId,studentId,Percentage, result){
    sql.query("UPDATE formation_has_students SET percentage = ? WHERE (students_id = ? AND formations_id= ?)", [Percentage, studentId,formationId], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
    };
module.exports= Formation_has_student;