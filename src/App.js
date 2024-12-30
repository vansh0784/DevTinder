const express = require("express");
const connectDB = require("./config/database");
const app = express();
const user=require("./models/user");
app.use(express.json());
app.post("/signup",async(req,res)=>{
    //console.log(req); this will give me the whole request message and its to hard to get the details from there which are comes at Api(post).
    // AS we know that the api which carries our data is in body but we can able to access it and it shows us a message undefined because js cannot understand the JSON and the post APi body has a json in it to access it we have to use a middleware ... provided by express to convert json into js.
    try{
      const User=new user(req.body);
      await User.save();
      res.send("User added Successfully");
    }
    catch(e){
      res.status(400).send("Failed"+e.message);
    }
})
// now i have to get the id from the database by filtering out some details

// there is the difference between the findOne and find function .. find function filters all the data but findOne only return the first data encounter at processing
// if we doesn't pass any filter in the find it returns us a whole details of the collection
app.get("/feed",async(req,res)=>{
  const request=req.body.email;
  const getData=await user.findOne({});
  if(getData){
    res.send(getData);
  }
  else res.status(404).send("User Not found");
});
// now i have to delete the data from the local database

app.delete("/feed",async(req,res)=>{
  const delData=req.body.userId;
  try{
    const result=await user.findByIdAndDelete(delData);
    console.log(result);
    res.send("User Deleted Successfully")
  }
  catch(e){
    res.status(400).send("Something went wrong");
  }
});
// now i have to update the details
app.patch("/user",async(req,res)=>{
  const userId=req.body.Id;
  const data=req.body;
  try{
    const detail=await user.findByIdAndUpdate();
    console.log(detail);
    res.send("User updated Successfully");
  }
  catch(e){
    res.status(400).send("Something went wrong");
  }
})
// there is a sli
app.put("/user",async(req,res)=>{
  const id=req.body.Id;
  const data=req.body;
  try{
    await user.findByIdAndUpdate(id,data);
    res.send("User updated successfully")
  }
  catch(e){
    res.status(400).send("Something went wrong");
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
