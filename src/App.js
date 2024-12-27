const express=require("express");
const app=express();
app.get("/user",(req,res)=>{
    res.send({firstName:"Vansh",
        secondName:"Singh"
    });
});
app.post("/user",(req,res)=>{
    res.send("User Added to Database Successfully!");
});
app.delete("/user",(req,res)=>{
    res.send("User deleted succesfully!");
});
app.patch("/user",(req,res)=>{
    res.send("Adding a minor Change");
});
app.put("/user",(req,res)=>{
    res.send("Changes have been made in DB");
});
app.use("/test",(req,res)=>{
    res.send("Hello I m Testing the server");
});

app.listen(3000 ,()=>{console.log("server is running properly")});
// Here order is really matter in code .. because server run it line by line