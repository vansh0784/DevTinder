const user=require("../models/user")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
// const { findById } = require("../models/user");
const userAuth=async(req,res,next)=>{
    const {email,password}=req.body;
    try{
        const isUser=await user.findOne({email:email});
        // console.log(isUser);
        if(!isUser){
            console.log("email is make error");
            throw new Error("Invalid Credentials 1");
        }
        const isPasswordMatch=await bcrypt.compare(password,isUser.password);
        // console.log(isPasswordMatch);
        if(!isPasswordMatch){
            console.log("password is make error");
            throw new Error("Invalid Credentials 2");
        }
        const token=jwt.sign({_id:isUser._id},"Vansh@123",{expiresIn:"1d"});
        // console.log(token);
        req.user=isUser;
        res.cookie("token",token);
        next();
    }
    catch(e){
        res.status(401).send("Invalid Credentials 3");
    }
}
const verifyToken=async(req,res,next)=>{
    try{
        const{token}=req.cookies;
        const isTokenValid=jwt.verify(token,"Vansh@123");
        // console.log(isTokenValid);
        if(isTokenValid){
            const{_id}=isTokenValid;
            const userProfile=await user.findById(_id);
            req.user=userProfile;
            next();
        }
        else{
            return res.status(401).send("Token expired --> Login again");
        }

    }
    catch(e){
        res.status(401).send("Invalid Credentials");
    }
}
// const adminAuth=(req,res,next)=>{
//     console.log("Check for admin authorization");
//     const token="abc";
//     const isAdminAuth=token==="def";
//     if(!isAdminAuth){
//         res.status(401).send("Unautorized Request");
//     }
//     else next();
// }
module.exports={
    userAuth,
    verifyToken
};