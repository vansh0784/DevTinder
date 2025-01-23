const cookieParser = require("cookie-parser");
const express = require("express");
const connRouter = express.Router();
connRouter.use(express.json());
connRouter.use(cookieParser());
const ConnectUser = require("../models/connectUser");
const { verifyToken } = require("../Middlewares/auth");
const mongoose = require("mongoose");
const displayProfile = ["firstName", "lastName", "About"];
// this api is for sending the request to the user with appropriate status as interested/ignore
connRouter.post(
  "/connection/:status/:UserId",
  verifyToken,
  async (req, res) => {
    try {
      const loggedInId = req.user?._id;
      const statusId = req.params.UserId;
      const stat = req.params.status;
      // console.log(loggedInId, statusId, stat);
      const allowedStatus = ["interested", "ignored"];

      if (!allowedStatus.includes(stat)) {
        return res.status(400).json({ message: `Invalid Status typee` });
      }
      // console.log(allowedStatus);
      const existingRequest = await ConnectUser.findOne({
        $or: [
          { loggedInId, statusId },
          { loggedInId: statusId, statusId: loggedInId },
        ],
      });
      if (existingRequest) {
        throw new Error("Connect Request already exits");
      }
      // console.log("Existing Request:", existingRequest);
      const connect = new ConnectUser({
        fromId: loggedInId,
        toId: statusId,
        status: stat,
      });
      await connect.save();
      res.json({ message: `Connection establish successfully!!` });
    } catch (e) {
      res.status(400).json({ message: `Failed!!!-${e.message}` });
    }
  }
);

// this api is for receiving request and accepting/rejecting that request

connRouter.post(
  "/request/review/:status/:UserId",
  verifyToken,
  async (req, res) => {
    try {
      const loggedInId = req.user?._id;
      const { status, UserId: requestId } = req.params;
      const isAllowedStatus = ["accepted", "rejected"];
      const id = new mongoose.Types.ObjectId(requestId);
      // console.log(status);
      // console.log(loggedInId);
      if (!isAllowedStatus.includes(status)) {
        return res.status(400).json({ message: `Invalid Status type` });
      }
      // console.log(isAllowedStatus);
      // console.log(typeof loggedInId);
      const existingUser = await ConnectUser.findOne({
        _id: id,
        toId: loggedInId,
        status: "interested",
      }).populate("fromId",displayProfile);

      console.log(existingUser);
      if (!existingUser) {
        return res
          .status(400)
          .json({ message: `No Connection found for ${req.user?.firstName}` });
      }
      existingUser.status = status;
      const data = await existingUser.save();
      // console.log(data);
      res.json({ message: `Connection request ${status}`, data:data });
    } catch (e) {
      res.status(400).json({ message: `Failed!!!-${e.message}` });
    }
  }
);
module.exports = connRouter;
