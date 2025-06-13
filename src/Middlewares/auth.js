const user=require("../models/user")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
// const { findById } = require("../models/user");
const userAuth = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const isUser = await user.findOne({ email });

    if (!isUser) {
      console.log("Invalid email");
      throw new Error("Invalid Credentials");
    }

    const isPasswordMatch = await bcrypt.compare(password, isUser.password);
    if (!isPasswordMatch) {
      console.log("Invalid password");
      throw new Error("Invalid Credentials");
    }

    const token = jwt.sign({ _id: isUser._id }, "Vansh@123", {
      expiresIn: "1d",
    });

    // ✅ Proper cookie options for cross-origin requests
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Required for HTTPS
      sameSite: "None", // Important for cross-site cookies
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    req.user = isUser;
    next();
  } catch (e) {
    console.log("Login error:", e.message);
    res.status(401).send("Invalid Credentials");
  }
};
const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("No token found. Please login.");
    }

    const isTokenValid = jwt.verify(token, "Vansh@123");

    if (!isTokenValid || !isTokenValid._id) {
      return res.status(401).send("Token is invalid or expired.");
    }

    const userProfile = await user.findById(isTokenValid._id);
    if (!userProfile) {
      return res.status(401).send("User not found.");
    }

    req.user = userProfile;
    next();
  } catch (e) {
    console.error("❌ Token verification failed:", e.message);
    res.status(401).send("Invalid Credentials");
  }
};
// const adminAuth=(req,res,next)=>{
//     console.log("Check for admin authorization");
//     const token="abc";
//     const isAdminAuth=token==="def";
//     if(!isAdminAuth){
//         res.status(401).send("Unautorized Request");
//     }
//     else next();
// }
module.exports={
    userAuth,
    verifyToken
};