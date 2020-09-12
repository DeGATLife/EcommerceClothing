const Student =require('./../Models/Student');
const User =require('./../Models/User');
const Token =require('./../Models/Token');
const jwt =require('jsonwebtoken');
const bcrypt=require('bcrypt');
const crypto=require('crypto');
const nodemailer=require('nodemailer');
exports.AddStudent =function(req,res){
    const NewUser =new User(req.body);    
    const hash=bcrypt.hashSync(NewUser.password,10);
    NewUser.password=hash;
    User.CreateUser(NewUser, function(err, user) {
      if (err)
         res.send(err);
       User.getUserByEmail(NewUser.email,function(err,result1){
           var token = new Token({ userId: result1[0].id, token: crypto.randomBytes(16).toString('hex') });              
           Token.CreateToken(token, function(err, result) {
             if (err)
                res.send(err);        
                var transporter = nodemailer.createTransport({ host: 'smtp.gmail.com',port: 587, auth: { user: process.env.EMAIL, pass: process.env.PASSWORD } });
                var mailOptions = { from: process.env.EMAIL, to: NewUser.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
                transporter.sendMail(mailOptions, function (err) {
                    if (err) { return res.status(500).send({ msg: err.message }); }
                    const st = attach(result1[0].id);
                   
                
                   res.status(200).send('A verification email has been sent to ' + NewUser.email + '.');
                 
                    
                    //res.status(200).send('A verification email has been sent to ' + NewUser.email + '.');
                });   
          });  
       })
   });         
    
}
function attach(userID){
   const student ={
       users_id:userID
   }
  
   const newStudent = new Student(student);
   Student.AddStudent(newStudent,function(err,resp){
       
       return true;
   })

}
exports.Firebase_Login = function(req,res){
    const NewUser =new User(req.body);   
   User.getUserByEmail(NewUser.email,function(err,response){
     if(err)
     res.status(503).send(err);
     if(response[0]!=''){
      let token= jwt.sign({id: response[0].id , role: 'Student'},process.env.SECRET_KEY,{
        expiresIn: 1440
         })
     res.json({token: token})
     }else{
       NewUser.isVerified=true;
      User.CreateUser(NewUser,function(err,resp){
        if(err)
        res.status(503).send(err)
        User.getUserByEmail(NewUser.email,function(err,user){
          if(err)
          res.status(503).send(err)
          const nu = attach(user[0].id);
          let token= jwt.sign({id: user[0].id , role: 'Student'},process.env.SECRET_KEY,{
            expiresIn: 1440
             })
         res.json({token: token})
        })
      }) 
     }
   }) 
  }
  