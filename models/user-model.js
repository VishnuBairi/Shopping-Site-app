const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    fullname:{
        type:String,
        minLength:8
    },
    email:String,
    password:String,
    phone:String,
    orders:{
        type:Array,
        default:[]
    },
    cart:{
        type:Array,
        default:[]
    },
    isAdmin:Boolean,
    picture:String
})

module.exports=mongoose.model("user",userSchema);