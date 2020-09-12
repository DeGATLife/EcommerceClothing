const User = require('../Models/User');
const jwt = require('jsonwebtoken');
// register policeman
module.exports.auth = (req, res, next) => {
      try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        const userId = payload._id;
        User.getUserById(payload.id,function(err,user){
            if(err)
            res.send(err)
            if(!user){
                throw "you haven't permission"
            }else{
                next();
            }
        })
      } catch {
        res.status(500).send({
          error:"Invalid request!"
        });
      }
    };
module.exports.registerPoliceman =(req,res,next) => {
    try{  const {email,fullname,username,password} =req.body;
     if(!email || !fullname || !username || !password ){
         
         res.status(500).send({
             error:"all information are required"
           })
     }else{
        User.getUserByEmail(email,function(err,response){
            if(err)
            res.status(500).send(err)
            if(response[0]){
               res.status(500).send({error :"Email already used "});
            }else{
                next();
            }
        })
     }
    }catch{
     res.status(500).send({
         error: "Invalid information!"
       });
    } 
 }
 //login policeman
 module.exports.loginPoliceman =(req,res,next) => {
    try{  const {email,password} =req.body;
     if(!email || !password ){
         res.status(500).send({
             error: "all information required"
           })
     }else{
        User.getUserByEmail(email,function(err,response){
            if(err)
            res.status(502).send(err)
            if(response[0]){
                if(response[0].isVerified ==false){
                   res.status(500).send({error:"user not verified or has been banned"})
                }else{
                    next();
                }
            }else{
                res.status(500).send({error:"wrong email"});
            }
        })
     }
    }catch{
     res.status(500).json({
         error: "Invalid information!"
       });
    } 
 }
  //firebase policeman
  module.exports.loginFirePoliceman =(req,res,next) => {
    try{  const {email,username} =req.body;
     if(!email || !username  ){
         res.status(500).send({
             error: "all information required"
           })
     }else{
        next();
     }
    }catch{
     res.status(500).send({
        error:"Invalid information!"
       });
    } 
 }