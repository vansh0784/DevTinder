const express=require("express");
const { verifyToken } = require("../Middlewares/auth");
const proRouter=express.Router();

proRouter.get("/profile",verifyToken,async(req ,res)=>{
    try{
        const {userProfile}=req.user;
        res.send(userProfile);
    }
    catch (e) {
        res.status(401).send("Profile Not Found !! " + e);
      }
})
proRouter.post("/profile/edit",async(req,res)=>{
    const {firstName,lastName,email,Gender,Age}=req.body;
})