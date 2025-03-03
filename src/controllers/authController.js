const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const users = [];

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ username, password: hashedPassword });
        const document = await newUser.save();
        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res
                .status(400)
                .json({ message: "Username or password is incorrect" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ username }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,   // Prevents JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === "production",    // Set to `true` if using HTTPS (you can keep `false` for HTTP during dev)
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",  // Helps prevent CSRF attacks
        })
        res.json({ message: "Login successful", user: { username: user.username, tasks: user.tasks } });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true, // Ensures cookie can't be accessed via JavaScript
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Protects against CSRF
    });
    return res.status(200).json({ message: "Logged out successfully" });
};


module.exports = { register, login, logout };