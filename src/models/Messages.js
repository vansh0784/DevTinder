const mongoose=require("mongoose");
const Messages=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.ObjectId,
    },
    recipientId:{
        type:mongoose.Schema.ObjectId,
    },
    senderName:{
        type:String,
    },
    recipientName:{
        type:String,
    },
    messageData:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
});

module.exports=mongoose.model("messages",Messages);