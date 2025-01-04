const express=require("express");
const { verifyToken } = require("../Middlewares/auth");
const {userAuth} =require("../Middlewares/auth");
const { validateProfileData } = require("../utils/Validation");
const cookieParser = require("cookie-parser");
const proRouter=express.Router();
const User=require("../models/user");
const bcrypt=require("bcrypt");
proRouter.use(express.json());
proRouter.use(cookieParser());
proRouter.get("/profile",verifyToken,async(req ,res)=>{
    try{
        const userProfile=req.user;
        res.send(userProfile);
    }
    catch (e) {
        res.status(401).send("Profile Not Found !! " + e);
      }
})
proRouter.patch("/profile/edit",verifyToken,async(req,res)=>{
    try{
        if(!validateProfileData(req)){
            throw new Error("Not Editable ");
        }
        const userId=req.user?._id;
        console.log(userId);
        if(!userId){
            return new Error("User Not Found");
        }
        const user=await User.findById(userId);
        Object.keys(req.body).forEach(key=>user[key]=req.body[key]);
        console.log(user);
        await user.save();
        res.json({message:`${user.firstName} your profile edit successfully`});

    }
    catch (e) {
        res.status(401).send("Not Editable !!1 " + e);
      }
});
proRouter.patch("/profile/editPassword",verifyToken,async(req,res)=>{
    try{
        const userId=req.user?._id;
        if(!userId){
            return new Error("Not a valid User");
        }
        const user=await User.findById(userId);
        if(!user){
            return new Error("User Not Found");
        }
        const {currentPassword,newPassword}=req.body;
        const isCorrectPassword=await bcrypt.compare(currentPassword,user?.password);
        if(!isCorrectPassword){
            throw new Error("Current Password is incorrect");
        }
        const newHashPassword=await bcrypt.hash(newPassword,10);
        user.password=newHashPassword;
        await user.save();
        res.json({
            message:`${user.firstName} password updated Successfully!!!`
        });
    }
    catch (e) {
        res.status(401).send("Not Editable !!1 " + e);
      }
})
module.exports=proRouter;