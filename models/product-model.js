const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    name:String,
    image:Buffer,
    price:Number,
    discount:{
        type:Number,
        default:0
    },
    bgcolor:String,
    textcolor:String,
    panelcolor:String
})

module.exports=mongoose.model("product",productSchema);