//const Admin = require('../Models/Admin');
const Course_collection = require('../Models/Course_collection');
const Course = require('../Models/Course');
const Formation = require('../Models/Formation');
const fs =require('fs');
const path =require('path');
const formidable = require('formidable');
//const Instructor = require('../Models/Instructor');
exports.Get_All_Collections = function(req,res){
  const {formations_id}= req.body;
  if(!formations_id){
    res.status(500).send({error:"information required"})
 }else{
  Course_collection.getAllCourse_collections(formations_id,function(err,result){
    if(err)
    res.send(err)
    res.send({Collection:result});
})
 }
 }
 exports.Get_Collction_Courses = function(req,res){
  const {collections_id}= req.body;
  if(!collections_id){
    res.status(500).send({error:"information required"})
 }else{
  Course.getAllCollectionCourse(collections_id,function(err,result){
    if(err)
    res.send(err)
    res.send({Collection:result});
})
 }
 }
exports.Store_Course = function(req,res){
  var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
          if(!file.url){
            res.status(500).send({error:"url required"})
         }else{
              const { period,namecr_fr,namecr_eng,description,collections_id}=fields;
              if(!period || !namecr_eng ||!namecr_fr || !description || !collections_id ){
                res.status(500).send({error:"all fields is required"})
              }else{ 
                Course_collection.findOneByID(fields.collections_id,function(err,response){
                  if(err)
                  res.send(err);
                  if(response[0]=='')
                  {
                     res.send('no existnce')
                  }else{
                    var oldpath = files.url.path;
                    var newpath = 'C:/Devloppement/Openlang/public/Upload/Formations/'+response[0].namef_eng+'/'+response[0].namefc_eng+'/' + fields.namecr_eng +path.extname(files.url.name);
                   const url = req.protocol + '://' + 'localhost:4000';
                    const sqlPath=`/Upload/Formations/${response[0].namef_eng}/${response[0].namefc_eng}/${fields.namecr_eng}${path.extname(files.url.name)}`;
                    fs.rename(oldpath, newpath, function (err) {
                      if (err) throw err;
                    });  
                   const formation ={
                     period:fields.period,
                     namecr_fr:fields.namecr_fr,
                     namecr_eng:fields.namecr_eng,
                     description:fields.description,
                     collections_id:fields.collections_id,
                     url:url+sqlPath
                 } 
                 const newCourse = new Course(formation);
                 Course.CreateCourse(newCourse,function(err,result){
                   if(err)
                        res.send(err)
                        res.send('Course created successefully');     
                  })
                 }
                })
              }
            }    
    })
}
exports.Store_Collection=function(req,res){
    
const formation ={
       formations_id:req.body.formations_id,
       namefc_fr:req.body.namefc_fr,
       namefc_eng:req.body.namefc_eng,

   }
   if(!formation.namefc_eng ||!formation.namecr_fr || !formation.formations_id ){
    res.status(500).send({error:"all fields is required"})
  }else{ 
    Formation.getFormationById(formation.formations_id,function(err,response){
      if(err)
      res.send(err);
      if(!response[0])
      {
         res.status(500).send({error:'formation doesnt exist '})
      }else{
        fs.mkdir(`./public/Upload/Formations/${response[0].namef_eng}/${formation.namefc_eng}`, function(err) {
          if (err) {
            console.log(err)
          } 
        })
        const newCollection = new  Course_collection(formation);
       Course_collection.AddCourse_collection(newCollection,function(err,result){
       if(err)
            res.send(err)
            res.send('Collection created successefully');     
      })
      }
    })
  }
}
