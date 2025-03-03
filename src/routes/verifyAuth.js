// server/routes/auth.js
const express = require("express");
const verifyAuth = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

verifyAuth.get("/", async (req, res) => {
  const token = req.cookies.token; // Read token from cookies
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({username: decoded.username});
    res.json({ isAuthenticated: true, user: {username: user.username, tasks: user.tasks}});
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = verifyAuth;
