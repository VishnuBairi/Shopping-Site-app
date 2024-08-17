const mongoose=require("mongoose");

const ownerSchema=mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }]
})

module.exports=mongoose.model("owner",ownerSchema);