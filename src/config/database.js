const database=require("mongoose");
require("dotenv").config();
const connectDB=async()=>{
    await database.connect(
        `mongodb+srv://vanshsin784:${process.env.password}@learnvansh.pzcfb.mongodb.net/devTinder`
    )
};
module.exports=connectDB;
