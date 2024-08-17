const express=require("express");
const router=express.Router();
const upload=require("../config/multer-config");
const productModel=require("../models/product-model");
const ownerModel=require("../models/owner-model");

router.post("/create",upload.single("image"),async(req,res)=>{
    try{
        let {name,price,discount,bgcolor,panelcolor,textcolor}=req.body;
        let adminUser=await ownerModel.findOne();
        console.log(adminUser.products);
        let product=await productModel.create({
        image:req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor
    });
    
    adminUser.products.push(product._id)
    await adminUser.save();
    req.flash("success","product created successfully");
    res.redirect("/owners/admin/createProduct");
    }catch(err){res.send(err.message);}
});

module.exports=router;