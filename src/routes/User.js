const express = require("express");
const UserRoute = express.Router();
const { verifyToken } = require("../Middlewares/auth");
const connectionUser = require("../models/connectUser");
const USER=require("../models/user");
const displayProfile = ["firstName", "lastName", "About"];
UserRoute.get("/user/request/recieved", verifyToken, async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) throw new Error("No user found!!");
    const allRequest = await connectionUser
      .find({
        toId: userId,
        status: "interested",
      })
      .populate("fromId", displayProfile);
    res.json({
      message: "Data Fetched successfully",
      connectReq: allRequest,
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
        $or: [
          { toId: loggedId, status: "accepted" },
          { fromId: loggedId, status: "accepted" },
        ],
      })
      .populate("toId", displayProfile)
      .populate("fromId", displayProfile);
    const data = allConnections.map((key) => key.toId);
    res.json({
      message: "All connections are Here",
      data: data,
    });
  } catch (e) {
    res.status(400).json({ message: "No Connections Found!!" });
  }
});
UserRoute.get("/feed", verifyToken, async (req, res) => {
  try{
    const loggedIn=req.user;
    const allConnection=await connectionUser.find({
      $or:[{fromId:loggedIn?._id},{toId:loggedIn?._id}]
    });
    const hideProfile=new Set();
    allConnection.forEach(pro=>{
      hideProfile.add(pro.fromId.toString());
      hideProfile.add(pro.toId.toString());
    });
    const user=await USER.find({
      $and:[
        {_id:{$nin:Array.from(hideProfile)}},
        {_id:{$ne:loggedIn?._id}}
      ]
    }).select(displayProfile);
    res.status(200).json({
      message:"All Feeds are Here...!",
      success:true,
      data:user,
    });
  }
  catch (e) {
    res.status(400).json({ message: "No Connections Found!!" });
  }
});
module.exports = UserRoute;
