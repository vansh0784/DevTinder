const database=require("mongoose");
const connectDB=async()=>{
    await database.connect(
        "mongodb+srv://vanshsin784:M5srX49vszuEhTJ7@learnvansh.pzcfb.mongodb.net/devTinder"
    )
};
module.exports=connectDB;
