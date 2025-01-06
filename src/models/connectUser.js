const mongoose =require("mongoose");
const ConnectUser=new mongoose.Schema({
    fromId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    toId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    status:{
        type:String,
        enum:{
            values:["accepted","ignored","interested","rejected"],
            message:`{VALUE} is incorrect status type`
        }
    }

},{
    timestamps:true
});
ConnectUser.pre("save",function(next){
    const connectRequest=this;
    if(connectRequest.fromId.equals(connectRequest.toId)){
        throw new Error("You can't send request to yourself");
    }
    next();
});
ConnectUser.index({ fromId: 1, toId: 1 }, { unique: true });
module.exports=mongoose.model("Connect",ConnectUser);