const express = require("express");
const UserRoute = express.Router();
const { verifyToken } = require("../Middlewares/auth");
const connectionUser = require("../models/connectUser");
const displayProfile=["firstName","lastName","About"];
UserRoute.get("/user/request/recieved", verifyToken, async (req, res) => {
    try{
        const userId=req.user?._id;
        if(!userId) throw new Error("No user found!!");
        const allRequest=await connectionUser.find({
            toId:userId,
            status:"interested"
        }).populate("fromId",displayProfile);
        const data=allRequest.map(key=>key.fromId);
        res.json({
            message:"Data Fetched successfully",
            data:data
        });
    } catch (e) {
        res.status(400).json({ message: "No Connections Found!!" });
    }
});
UserRoute.get("/user/connectionList", verifyToken, async (req, res) => {
  try {
    const loggedId = req.user?._id;
    if (!loggedId) {
      throw new Error("No User found!!");
    }
    const allConnections = await connectionUser
      .find({
        $or:[
            {toId:loggedId,status:"accepted"},
            {fromId:loggedId,status:"accepted"}
        ]
      })
      .populate("toId",displayProfile).populate("fromId",displayProfile);
      console.log(allConnections);
      const data=allConnections.map(key=>key.toId);
      res.json({
        message:"All connections are Here"
        ,data:data
      });
  } catch (e) {
    res.status(400).json({ message: "No Connections Found!!" });
  }
});
module.exports = UserRoute;
