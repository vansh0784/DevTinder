const express=require("express");
const app=express();
app.use("/test",(req,res,next)=>{
    console.log("Handling first Routes");
    next();
    // res.send("Hello I m Testing the server");

},(req,res,next)=>{
    console.log("Handling Second Routes")
    next();
});

app.listen(3000 ,()=>{console.log("server is running properly")});
// Here order is really matter in code .. because server run it line by line


// there will be a concept of dynamic routing and we can use some regex and operators in the routing like +,*,(),
// for dynamic routing we can use the

// next function helps us to move to another request handlers ... what if we define next at the end of the request handler without sending the request handler then it will give us error of "Not getting the /route"


/* next function act as the middleware of the request handlers ... request handlers are those who return response of the request

Working of the expressJs= first it will go to the server ==> matching routes ==> after matching it look for the middleware chaining ==> after that when it encounter a response handler it returns it 
*/