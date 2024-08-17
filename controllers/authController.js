const userModel=require("../models/user-model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken}=require("../utils/generateToken");
const ownerModel=require("../models/owner-model");

module.exports.registerUser=async(req,res)=>{
    try{    

    let {fullname,email,password,phone}=req.body;
    let user=await userModel.findOne({email:email});
    if(user){
        req.flash("error","User already exists");
        return res.redirect("/")
    }
    else{

        bcrypt.genSalt(12,(err,salt)=>{
            bcrypt.hash(password, salt, async(err, hash) => {
                let createdUser=await userModel.create({
                    fullname:fullname,
                    email:email,
                    password:hash,
                    phone:phone
                })
                let token=generateToken(createdUser);
                res.cookie("token",token);
                res.status(201).send("user created successfully");
        })

    })
    }
    }
    catch(err){
        res.status(500).send(err.message);
    }
}

module.exports.loginUser=async(req,res)=>{
    try{
        let {email,password}=req.body;
        let user=await userModel.findOne({email:email});
        if(!user){
            res.flash("error","User not found");
            res.redirect("/");
        }
        else{
            bcrypt.compare(password,user.password,(err,result)=>{
                if(!result) {req.flash("error","Invalid Credentials");
                    return res.redirect("/");
                }
                else{
                    let token=generateToken(user);
                    res.cookie("token",token);
                    res.redirect("/shop");
                }
            })
        }

    }catch(err){
        res.status(500).send(err.message);
    }
}

module.exports.loginAdmin=async(req,res)=>{
    try{
        let {email,password}=req.body;
        let owner=await ownerModel.findOne({email:email});
        if(!owner){
            req.flash("error","Admin not found");
            return res.redirect("/owners/adminlogin");
        }
        else{
            bcrypt.compare(password,owner.password,(err,result)=>{
                if(!result) {
                    req.flash("error","Invalid Credentials");
                    return res.redirect("/owners/adminlogin");
                }
                else{
                    let token=generateToken(owner);
                    res.cookie("token",token);
                    res.redirect("/owners/admin");
                }
            })
        }

    }catch(err){
        res.status(500).send(err.message);
    }
}


module.exports.logoutUser=async(req,res)=>{
    try{
        res.cookie("token","");
        req.flash("error","User logged out successfully");
        res.redirect("/");
    }catch(err){
        res.status(500).send(err.message);
    }
}