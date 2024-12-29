const express = require("express");
const connectDB = require("./config/database");
const app = express();
const user=require("./models/user");
app.use(express.json());
app.post("/signup",async(req,res)=>{
    //console.log(req); this will give me the whole request message and its to hard to get the details from there which are comes at Api(post).
    console.log(req.body);
    // AS we know that the api which carries our data is in body but we can able to access it and it shows us a message undefined because js cannot understand the JSON and the post APi body has a json in it to access it we have to use a middleware ... provided by express to convert json into js.
    try{
      const User=new user(req.body);
      await User.save();
      res.send("User added Successfully");
    }
    catch(e){
      console.log(e.message);
    }
})
connectDB()
  .then(() => {
    console.log("Database connection is Successful");
    app.listen(3000, () => {
      console.log("server is running properly");
    });
  })
  .catch((err) => {
    console.error("Failed to Connect the Database");
  });
// Here order is really matter in code .. because server run it line by line

// there will be a concept of dynamic routing and we can use some regex and operators in the routing like +,*,(),
// for dynamic routing we can use the

// next function helps us to move to another request handlers ... what if we define next at the end of the request handler without sending the request handler then it will give us error of "Not getting the /route"

/* next function act as the middleware of the request handlers ... request handlers are those who return response of the request

Working of the expressJs= first it will go to the server ==> matching routes ==> after matching it look for the middleware chaining ==> after that when it encounter a response handler it returns it
*/

// For error handling we can use a try catch block to keep it graceful for us and it does not explode our whole code
