const jwt=require("jsonwebtoken");
const userModel=require("../models/user-model");

module.exports=async(req,res,next)=>{
    if(!req.cookies.token) {
        req.flash("error","you need to login first");
        return res.redirect("/");
    }
    try{
        let token=req.cookies.token;
        const decoded=jwt.verify(token,process.env.JWT_KEY);
        let user=await userModel.findOne({email:decoded.email}).select("-password");
        if(!user) {
            req.flash("error","you need to login first");
        }
        req.user=user;
        next();
    }catch(err){
        req.flash("error","something went wrong");
        res.redirect("/");
    }

};