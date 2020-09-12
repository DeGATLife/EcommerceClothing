const sql = require("./../DB/db");
//user object constructor
var Formation =function(formation){
    this.namef_fr=formation.namef_fr,
    this.namef_eng=formation.namef_eng,
    this.image=formation.image,
    this.period=formation.period,
    this.description=formation.description,
    this.price=formation.price,
    this.categories_id=formation.categories_id
    this.instructor_id=formation.instructor_id
}
//create formation function
Formation.CreateFormation = function (newFormation,result){
    sql.query("INSERT INTO formations set ?",newFormation,function(err,res){
        if(err){
            console.log("error :",err);
            result(err,null);
        }else{
                 console.log(res.insertId);
                result(null, res.insertId);
        }
    });
};
Formation.getFormationById = function (formationId, result) {
    sql.query("Select * from formations where id = ? ", formationId, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};

Formation.getFormationByName = function (Name, result) {
    sql.query("Select * from formations where namef_fr = ? ", Name, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};
Formation.getInstructorFormation = function (instructorId,result) {
    sql.query("Select * from formations where instructor_id = ? ", instructorId, function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(err,null);
            }
            else{
              console.log('formations : ', res);  

             result(null, res);
            }
        });   
};
Formation.getAllFormation = function (result) {
    sql.query("Select f.namef_fr,f.description,f.period,f.price,c.namec_fr,u.fullname FROM formations f INNER JOIN categories c ON (c.id = f.categories_id) INNER JOIN users u ON (u.id = f.instructor_id);", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(err,null);
            }
            else{
              console.log('formations : ', res);  

             result(null, res);
            }
        });   
};
Formation.updateImage = function(id, Image, result){
sql.query("UPDATE formations SET image = ? WHERE id = ?", [Image, id], function (err, res) {
      if(err) {
          console.log("error: ", err);
            result(err,null);
         }
       else{   
         result(null, res);
            }
        }); 
};

Formation.updatePeriod = function(id, Period, result){
    sql.query("UPDATE formations SET period = ? WHERE id = ?", [Period, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(err, null);
             }
           else{   
             result(null, res);
                }
            }); 
};
Formation.updateDescription = function(id, Description, result){
    sql.query("UPDATE formations SET description = ? WHERE id = ?", [Description, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(err,null);
             }
           else{   
             result(null, res);
                }
            }); 
};
Formation.updateNameFr = function(id, NameFr, result){
sql.query("UPDATE formations SET namf_fr = ? WHERE id = ?", [NameFr, id], function (err, res) {
      if(err) {
          console.log("error: ", err);
            result(err,null);
         }
       else{   
         result(null, res);
            }
        }); 
};
Formation.updateNameEng = function(id, NameENG, result){
    sql.query("UPDATE formations SET namef_eng = ? WHERE id = ?", [NameENG, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(err,null);
             }
           else{   
             result(null, res);
                }
            }); 
};

Formation.delete = function (formationId, result) {
    sql.query("DELETE from formations WHERE id = ?", [formationId], function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};
module.exports= Formation;