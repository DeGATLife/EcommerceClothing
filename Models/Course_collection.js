const sql = require("./../DB/db");
//user object constructor
var Course_collection =function(collection){ 
    this.formations_id=collection.formations_id,
    this.namefc_fr=collection.namefc_fr,
    this.namefc_eng=collection.namefc_eng
}
//create user function
Course_collection.AddCourse_collection = function (newCourse_collection,result){
    sql.query("INSERT INTO course_collections set ?",newCourse_collection,function(err,res){
        if(err){
            console.log("error :",err);
            result(err,null);
        }else{
                 console.log(res.insertId);
                result(null, res.insertId);
        }
    });
};
 Course_collection.findOneByID = function (userID, result) {
    sql.query("Select c.namefc_eng ,f.namef_eng From course_collections c INNER JOIN formations f ON (f.id = c.formations_id) AND (formations_id = ?);", userID, function (err, res) {             
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
Course_collection.getAllCourse_collections = function (formationID,result) {
    sql.query("Select c.namefc_fr,f.namef_fr From course_collections c INNER JOIN formations f ON (f.id = c.formations_id) AND (formations_id = ?);"
   ,formationID, function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(err,null);
            }
            else{
              console.log('Collection : ', res);  

             result(null, res);
            }
        });   
};
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
module.exports= Course_collection;