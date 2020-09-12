const sql = require("./../DB/db");
//user object constructor
var Category =function(category){
    this.namec_fr=category.namec_fr,
    this.namec_eng=category.namec_eng
}
//create user function
Category.CreateCategory = function (newCategory,result){
    sql.query("INSERT INTO catgories set ?",newCategory,function(err,res){
        if(err){
            console.log("error :",err);
            result(err,null);
        }else{
                 console.log(res.insertId);
                result(null, res.insertId);
        }
    });
};
Category.getCategoryById = function (categoryId, result) {
    sql.query("Select * from categories where id = ? ", categoryId, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};


Category.getAllCategories = function (result) {
    sql.query("Select * from categories", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
              console.log('categories : ', res);  

             result(null, res);
            }
        });   
};
Category.updateNameFr = function(id, NameFr, result){
sql.query("UPDATE Categories SET namec_fr = ? WHERE id = ?", [NameFr, id], function (err, res) {
      if(err) {
          console.log("error: ", err);
            result(null, err);
         }
       else{   
         result(null, res);
            }
        }); 
};
Category.updateNameEng = function(id, NameEng, result){
    sql.query("UPDATE categories SET namec_eng = ? WHERE id = ?", [NameEng, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
    };
Category.delete = function (categoryId, result) {
    sql.query("DELETE from categories WHERE id = ?", [categoryId], function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};
module.exports= Category;