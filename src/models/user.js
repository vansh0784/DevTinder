const mongo=require("mongoose");
const valid=require("validator");
const Userschema=new mongo.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!valid.isEmail(value)){
                throw new Error("Not a valid Email Address");
            }
        },
    },
    password:{
        type:String,
        required:true,
        validate(val){
            if(!valid.isStrongPassword(val)){
                throw new Error("Not a strong password"+val);
            }
        }
    },
    Age:{
        type:String,
        validate(value){
            if(value<18){
                throw new Error("Age got restricted");
            }
        }
    },
    Gender:{
        type:String,
    },
    About:{
        default:"Hello , Im using the devTinder",
        type:String
    }
},{
    timestamps:true,
})
module.exports=mongo.model("User",Userschema);