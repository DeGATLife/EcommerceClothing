const Admin = require('../Models/Admin');
const jwt = require('jsonwebtoken');
module.exports.auth = (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      Admin.findOneByuserID(payload.id,function(err,user){
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