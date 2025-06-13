const express = require("express");
const UserRoute = express.Router();
const { verifyToken } = require("../Middlewares/auth");
const connectionUser = require("../models/connectUser");
const USER=require("../models/user");
const displayProfile = ["firstName", "lastName", "About"];

UserRoute.get("/user/request/received", verifyToken, async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) throw new Error("No user found!");

    const allRequest = await connectionUser
      .find({
        toId: userId,
        status: "interested",
      })
      .populate("fromId", displayProfile.join(" "));

    res.status(200).json({
      message: "Requests fetched successfully.",
      connectReq: allRequest,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message || "Failed to fetch connection requests.",
    });
  }
});

// ✅ Get all connections of logged-in user
UserRoute.get("/user/connectionList", verifyToken, async (req, res) => {
  try {
    const loggedId = req.user?._id;
    if (!loggedId) throw new Error("No user found!");

    const allConnections = await connectionUser
      .find({
        $or: [
          { toId: loggedId, status: "accepted" },
          { fromId: loggedId, status: "accepted" },
        ],
      })
      .populate("toId", displayProfile.join(" "))
      .populate("fromId", displayProfile.join(" "));

    const data = allConnections.map((conn) => {
      return conn.toId._id.toString() === loggedId.toString()
        ? conn.fromId
        : conn.toId;
    });

    res.status(200).json({
      message: "All connections fetched successfully.",
      data: data,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message || "Failed to fetch connection list.",
    });
  }
});

// ✅ Feed: show users not yet connected to the logged-in user
UserRoute.get("/feed", verifyToken, async (req, res) => {
  try {
    const loggedInId = req.user?._id;
    if (!loggedInId) throw new Error("User not found from token.");

    // 🧠 Step 1: Fetch all connection records involving this user
    const allConnections = await connectionUser.find({
      $or: [{ fromId: loggedInId }, { toId: loggedInId }],
    });

    // 🧠 Step 2: Add self + all connected users to a Set (to hide)
    const hideProfile = new Set([loggedInId.toString()]);
    allConnections.forEach((conn) => {
      hideProfile.add(conn.fromId.toString());
      hideProfile.add(conn.toId.toString());
    });

    // 🧠 Step 3: Fetch all users NOT in hideProfile
    const usersToShow = await USER.find({
      _id: { $nin: Array.from(hideProfile) },
    }).select(displayProfile.join(" "));

    // 🧠 Debug logs
    console.log("🔐 Logged-in ID:", loggedInId);
    console.log("🧾 Total connections found:", allConnections.length);
    console.log("❌ Hidden User IDs:", Array.from(hideProfile));
    console.log("📢 Users to show in feed:", usersToShow.length);

    // 🧠 Response
    res.status(200).json({
      message: "All feeds are here.",
      success: true,
      data: usersToShow,
    });
  } catch (e) {
    console.error("❌ Feed Error:", e.message);
    res.status(400).json({
      success: false,
      message: e.message || "Failed to fetch feed.",
    });
  }
});
module.exports = UserRoute;
