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
    },
    imageUrl:{
        type:String,
        default:`https://imgs.search.brave.com/oJUxonEvz7P_qkOC_-rYriP6a_qd9HESeJEXuACr75k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzk5LzczLzI2/LzM2MF9GXzI5OTcz/MjY2OF9nWnFLVmJ1/Mktqcm9MWXRUOWhS/WmZFMzdBWldGSEpR/bi5qcGc`,
    }
},{
    timestamps:true,
})
module.exports=mongo.model("User",Userschema);