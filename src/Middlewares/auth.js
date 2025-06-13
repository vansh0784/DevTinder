const user=require("../models/user")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
// const { findById } = require("../models/user");

const verifyToken=async(req,res,next)=>{
    try{
        const{token}=req.cookies;
        const isTokenValid=jwt.verify(token,"Vansh@123");
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