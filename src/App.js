const express=require("express");
const app=express();
const {userAuth,adminAuth}=require("./Middlewares/auth");
// Now we will playing with the middleware
app.use("/user",userAuth,(req,res)=>{
    res.send("User gets Authorized");
})
app.use("/admin",adminAuth,(req,res)=>{
    res.send("Admin get Authorized");
})
app.use("/user/login",(req,res)=>{
    res.send("Login Successful!");
});
// Error handling --- and the call back function has 4 parameter (error,request,response,next) if wwe give two parameter it understand dynamically (req,res) if we give three then(req,res,next) and note error paramteter always come before the req,res,next;
app.use("/hello",(err,req,res,next)=>{
    try{
        throw new Error("I m going to explode your code");
        res.send("Code has some error in it")
    }
    catch(err){
        res.status(401).send("Try Again Later / Contact Support Team");
    }
});

app.listen(3000 ,()=>{console.log("server is running properly")});
// Here order is really matter in code .. because server run it line by line


// there will be a concept of dynamic routing and we can use some regex and operators in the routing like +,*,(),
// for dynamic routing we can use the

// next function helps us to move to another request handlers ... what if we define next at the end of the request handler without sending the request handler then it will give us error of "Not getting the /route"


/* next function act as the middleware of the request handlers ... request handlers are those who return response of the request

Working of the expressJs= first it will go to the server ==> matching routes ==> after matching it look for the middleware chaining ==> after that when it encounter a response handler it returns it
*/

// For error handling we can use a try catch block to keep it graceful for us and it does not explode our whole code