const express=require("express");
const app=express();
app.use("/test",(req,res)=>{
    res.send("Hello I m Testing the server");
})
app.use("/",(req,res)=>{
    res.send("Welcome To Server!");
})
app.use("/helllo",(req,res)=>{
    res.send("Hello Hello Hello !");
})
app.listen(3000 ,()=>{console.log("server is running properly")});