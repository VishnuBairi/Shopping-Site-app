const express=require("express");
const router=express.Router();
const ownerModel=require("../models/owner-model");
const { loginAdmin } = require("../controllers/authController");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/generateToken");

if(process.env.NODE_ENV === "development"){
router.post("/create",async(req,res)=>{
    let {fullname,email,password}=req.body;
    let owner=await ownerModel.find();
    if(owner.length >0){
        res.status(400).send("Admin already exists");
    }
    bcrypt.genSalt(12,(err,salt)=>{
        bcrypt.hash(password, salt, async(err, hash) => {
            let createdUser=await ownerModel.create({
                fullname:fullname,
                email:email,
                password:hash,
            })
            let token=generateToken(createdUser);
            res.cookie("token",token);
            res.send("admin created");
    })
})
})
}

router.get("/adminlogin",(req,res)=>{
    let error=req.flash("error");
    res.render("owner-login",{error, loggedin: false});
});

router.post("/login",loginAdmin);

router.get("/admin",async(req,res)=>{
    let admindata=await ownerModel.findOne().populate("products");
    res.render("admin",{admindata});
})
router.get("/admin/createProduct",(req,res)=>{
    let success=req.flash("success")
    res.render("createProducts",{success});
})


module.exports=router;