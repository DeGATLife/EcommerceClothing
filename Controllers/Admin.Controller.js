const Admin = require('../Models/Admin');
const Student = require('../Models/Student');
const Instructor = require('../Models/Instructor');
const User = require('../Models/User');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
//Store Admin by id
exports.Store_Admin_ByID = function(req,res){
    const admin ={
        admins_id:req.body.user_id
    } 
    if(!admin.admins_id){
       res.status(500).send({error:"admin information required"})
    }else{
    User.getUserById(admin.admins_id,function(err,user){
        if(err)
        res.send(err)
        const newAdmin = new Admin(admin);
        Admin.AddAdmin( newAdmin,function(err,adminrs){
            if(err)
            res.send(err)
            res.send('Admin addd successfully');
        })
    })
   } 
} 

exports.Get_All_Users = function(req,res){
    User.getAllUser(function(err,result){
        if(err)
        res.send(err)
        res.send({'users' : result});
    })
} 
exports.Get_All_Instructors = function(req,res){
    Instructor.getAllInstructors(function(err,result){
        if(err)
        res.send(err)
        res.send({'instructors' : result});
    })
} 
exports.Get_All_Students = function(req,res){
    Student.getAllStudents(function(err,result){
        if(err)
        res.send(err)
        res.send({'students' : result});
    })
} 
exports.Store_Insptructor_ByID = function(req,res){
    const instructor ={
        instructors_id:req.body.user_id
    } 
    if(!instructor.instructors_id){
        res.status(500).send({error:"instructor information required"})
     }else{
    User.getUserById(instructor.instructors_id,function(err,user){
        if(err)
        res.send(err)
        const newInstructor = new Instructor(instructor);
        Instructor.AddInstructor(newInstructor,function(err,adminrs){
            if(err)
            res.send(err)
            res.send('Instructor added successfully');
        })
    })
}
} 
exports.Banne_User = function(req,res){
    const User_id = req.body.user_id;
    if(!User_id){
        res.status(500).send({error:"User information required"})
     }else{
    User.Banne(User_id,false,function(err,result){
        if(err)
        res.send(err)
        res.send('User has been Banned')
    })
}
}
// Enable User account
exports.Enable_User= function(req,res){
    const User_id = req.body.user_id;
    if(!User_id){
        res.status(500).send({error:"User information required"})
     }else{
    User.Verify(User_id,true,function(err,result){
        if(err)
        res.send(err)
        res.send('User activated')
    })
}
}