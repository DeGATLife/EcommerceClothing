const User =require('./../Models/User');
const jwt =require('jsonwebtoken');
const Token =require('./../Models/Token');
const bcrypt=require('bcrypt');
const crypto=require('crypto');
const nodemailer=require('nodemailer');
exports.Create_a_User =function(req,res){
   
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
                         console.log(result1[0])
                         return result1[0];
                         
                         //res.status(200).send('A verification email has been sent to ' + NewUser.email + '.');
                     });   
               });  
            })
        });         
}
exports.Login =function(req,res){
  
  const email = req.body.email;
     User.getUserByEmail(email,function(err,user){
     if(err)
      res.send(err)
      let token= jwt.sign({id: user[0].id},process.env.SECRET_KEY,{
              expiresIn: 1440
               })
           res.json({token: token})
    
  });
}
exports.User_Profile = function(req,res){
  const token = req.header('Authorization').replace('Bearer ', '');
  const payload=jwt.verify(token,process.env.SECRET_KEY);
  User.getUserById(payload.id,function(err,user){
        if(err)
          res.send(err)
        res.json(user)
  });
}
exports.Add_a_UserAdr = function(req,res){
  const token = req.header('Authorization').replace('Bearer ', '');
  const payload=jwt.verify(token,process.env.SECRET_KEY);
  User.updateAddress(payload.id,req.body.address,function(err,user){
      if(err)
        err
      res.json("address updated successfully !");
  });
}
exports.Add_a_UserTel = function(req,res){
  const token = req.header('Authorization').replace('Bearer ', '');
  const payload=jwt.verify(token,process.env.SECRET_KEY);
  User.updateTel(payload.id,req.body.tel,function(err,user){
      if(err)
        res.send(err)
      res.json("Phone number updated successfully !")
  });

}
exports.confirmeToken = function (req, res, next) {
    // Check for validation errors    
    // Find a matching token
    
    Token.findOneByToken( req.params.token , function (err, token1) {
        if (!token1) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
      
        // If we found a token, find a matching user
        User.getUserById ( token1[0].userId , function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
           
            if (user[0].isVerified == true) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
 
            // Verify and save the user
           User.Verify(token1[0].userId,true,function(err,result2){
            if (err) { return res.status(500).send({ msg: err.message }); }
            
             res.status(200).send("The account has been verified. Please log in.");
           })
        });
    });
};
exports.resendTokenPost = function (req, res, next) {
  
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });
 
        // Create a verification token, save it, and send email
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
 
            // Send the email
            var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
            var mailOptions = { from: 'no-reply@codemoto.io', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
            });
        });
 
    });
};
exports.Delete_a_User = function(req,res){
    const id=req.body.id;
  User.delete(id,function(err,droped){
    if(err)
      res.send(err)
    res.send("User deleted succesfully");
  });
}
