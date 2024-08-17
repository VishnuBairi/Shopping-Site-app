const express=require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const router=express.Router();
const userModel=require("../models/user-model");
const productModel=require("../models/product-model");

router.get("/",(req,res)=>{
    let error=req.flash("error");
    res.render("index",{error, loggedin: false });
})
router.get("/shop",isLoggedIn,async(req,res)=>{
    let products=await productModel.find();
    let success=req.flash("success");
    res.render("shop",{products, success});
});
router.get("/addtocart/:productid",isLoggedIn,async(req,res)=>{
    let user=await userModel.findOne({email:req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","Added to Cart")
    res.redirect("/shop");
});

router.get("/cart",isLoggedIn,async(req,res)=>{
    let user=await userModel.findOne({email:req.user.email}).populate("cart");
    var total=0;
    for(let i=0; i<user.cart.length;i++){
        total+= user.cart[i].price;
    }
    res.render("cart",{user,total});
});


module.exports=router;