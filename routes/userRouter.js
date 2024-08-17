const express=require("express");
const app=express();
const router=express.Router();
const userModel=require("../models/user-model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken}=require("../utils/generateToken");
const{registerUser, loginUser, logoutUser}=require("../controllers/authController");
const isLoggedIn=require("../middleware/isLoggedIn");



router.post("/registerUser",registerUser);

router.post("/loginUser",loginUser);

router.get("/logoutUser",logoutUser);

router.get("/",(req,res)=>{
    res.send("Hello World");
})

module.exports=router;