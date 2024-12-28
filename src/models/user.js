const mongo=require("mongoose");
const Userschema=new mongo.Schema({
    firstName:{
        type:"string"
    },
    lastName:{
        type:"string"
    },
    email:{
        type:"string"
    },
    Age:{
        type:"string"
    },
    Gender:{
        type:"string"
    }
})
module.exports=mongo.model("User",Userschema);