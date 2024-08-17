const express=require("express");
const app=express();
const cookieParser = require("cookie-parser");
const path = require("path");
const port=3000;
const db=require("./config/mongoose-connection");
const userRouter=require("./routes/userRouter");
const productRouter=require("./routes/productRouter");
const ownerRouter=require("./routes/ownerRouter");
require("dotenv").config();
const flash=require("connect-flash");
const expressSession=require("express-session");
const indexRouter=require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET
    })
)
app.use(flash());

app.use("/",indexRouter);
app.use("/owners",ownerRouter);
app.use("/products",productRouter);
app.use("/users",userRouter);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})