const sql = require("./../DB/db");
//user object constructor
var Course =function(course){
    this.namecr_fr=course.namecr_fr,
    this.namecr_eng=course.namecr_eng,
    this.url=course.url,
    this.period=course.period,
    this.description=course.description,
    this.collections_id=course.collections_id
}
//create user function
Course.CreateCourse = function (newCourse,result){
    sql.query("INSERT INTO courses set ?",newCourse,function(err,res){
        if(err){
            console.log("error :",err);
            result(err,null);
        }else{
                 console.log(res.insertId);
                result(null, res.insertId);
        }
    });
};
Course.getCourseById = function (userId, result) {
    sql.query("Select * from courses where id = ? ", userId, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};

Course.getCourseByName = function (Name, result) {
    sql.query("Select * from courses where namecr_fr = ? ", Name, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};
Course.getAllCollectionCourse = function (formationId,result) {
    sql.query(
"Select r.id,r.namecr_fr, r.period,r.description,f.namef_fr,c.namefc_fr FROM courses r INNER JOIN course_collections c ON (r.collections_id = c.id ) AND (collections_id = ?) INNER JOIN formations f ON (f.id = c.formations_id)  ;", [formationId], function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err,null);
            }
            else{
             result(null, res);
            }
        });   
};
Course.updateUrl = function(id, Username, result){
sql.query("UPDATE courses SET url = ? WHERE id = ?", [Username, id], function (err, res) {
      if(err) {
          console.log("error: ", err);
            result(err,null);
         }
       else{   
         result(null, res);
            }
        }); 
};

Course.updatePeriod = function(id, Email, result){
    sql.query("UPDATE courses SET period = ? WHERE id = ?", [Email, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(err, null);
             }
           else{   
             result(null, res);
                }
            }); 
};
Course.updateDescription = function(id, Password, result){
    sql.query("UPDATE courses SET description = ? WHERE id = ?", [Password, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(err,null);
             }
           else{   
             result(null, res);
                }
            }); 
};
Course.updateNameFr = function(id, Address, result){
sql.query("UPDATE courses SET namecr_fr = ? WHERE id = ?", [Address, id], function (err, res) {
      if(err) {
          console.log("error: ", err);
            result(err,null);
         }
       else{   
         result(null, res);
            }
        }); 
};
Course.updateNameEng = function(id, PhNbr, result){
    sql.query("UPDATE courses SET namecr_eng = ? WHERE id = ?", [PhNbr, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(err,null);
             }
           else{   
             result(null, res);
                }
            }); 
};

Course.delete = function (userId, result) {
    sql.query("DELETE from courses WHERE id = ?", [userId], function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};
module.exports= Course;