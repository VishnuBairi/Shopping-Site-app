const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    phone:String,
    orders:{
        type:Array,
        default:[]
    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }],
    picture:String
})

module.exports=mongoose.model("user",userSchema);