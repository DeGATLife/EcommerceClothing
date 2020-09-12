//const Admin = require('../Models/Admin');
const Formation = require('../Models/Formation');
var formidable = require('formidable');
var fs = require('fs');
const path = require('path');
//const Instructor = require('../Models/Instructor');
exports.Get_All_Formation = function(req,res){
    Formation.getAllFormation(function(err,result){
        if(err)
        res.send(err)
        res.send({'Formation':result});
    })
}
exports.Store_Formation=function(req,res){
 
    var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
          if(!file.image){
            res.status(500).send({error:"image  required"})
         }else{
              const { period,namef_fr,namef_eng,price,description,instructor_id,categories_id}=fields;
              if(!period || !namef_eng ||!namef_fr || !price || !description || !instructor_id || !categories_id){
                res.status(500).send({error:"all fields is required"})
              }else{
                fs.mkdir(`./public/Upload/Formations/${fields.namef_eng}`, function(err) {
                  if (err) {
                    console.log(err)
                  } 
                })
           var oldpath = files.image.path;
           const {namef_eng} = fields;
           var newpath = 'C:/Devloppement/Openlang/public/Upload/Formations/'+namef_eng+'/' + namef_eng + '.'+path.extname(files.image.name);
           const url = req.protocol + '://' + 'localhost:4000';
              const sqlPath=`/Upload/Formations/${namef_eng}/${namef_eng}.${path.extname(files.image.name)}`;
           fs.rename(oldpath, newpath, function (err) {
             if (err) throw err;
           });
           const formation ={
                  period:fields.period,
                  namef_fr:fields.namef_fr,
                  namef_eng:fields.namef_eng,
                  price:fields.price,
                  description:fields.description,
                  instructor_id:fields.instructor_id,
                  categories_id:fields.categories_id,
                  image:url+sqlPath
              }
              const newFormation = new Formation(formation);
              Formation.CreateFormation(newFormation,function(err,result){
              if(err)
                   res.send(err)
                   res.send('Formation created successefully');     
             })
              }
         }
           
    })
  
}
