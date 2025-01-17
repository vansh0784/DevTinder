const express=require("express");
const authRouter=express.Router();
const bcrypt = require("bcrypt");
const user=require("../models/user");
const cookieParser=require("cookie-parser");
const {validationForSignUp}=require("../utils/Validation");
const {userAuth}=require("../Middlewares/auth")
authRouter.use(express.json());
authRouter.use(cookieParser());
authRouter.post("/signup",async(req,res)=>{
    validationForSignUp(req.body);
    const {firstName,lastName,email,password}=req.body
    try{
        const Hashpassword=await bcrypt.hash(password,10);
        const User=new user({
            firstName,
            lastName,
            email,
            password:Hashpassword
        });
        await User.save();
        res.send("User added successfully!!");
    }
    catch (e) {
        res.status(400).send("Failed" + e.message);
      }
})
authRouter.post("/login",userAuth,(req,res)=>{
    try{
        res.status(200).json({
            message:"Login Sucessful!!!",
            data:req.user,
        })
    }
    catch(e){
        res.status(401).send("login failed" + e);
    }
});
authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now())});
    res.send("Logout successfully!!!!")
})
module.exports=authRouter;