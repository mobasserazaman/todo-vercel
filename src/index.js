const express = require('express');
const taskRouter = require('./routes/taskRoutes');
const authRouter = require('./routes/authRoutes');
const protect = require("./middlewares/authMiddleware");
const connectDB = require("../src/config/db");
const cors = require("cors")
const User = require("./models/userModel");
const cookieParser = require("cookie-parser");
const verifyAuth = require('./routes/verifyAuth');
require('dotenv').config();

if(process.env.NODE_ENV !== "test") connectDB();
const app = express();
app.use(cookieParser());   // 👈 Parse cookies automatically ✅

const allowedOrigins = process.env.NODE_ENV === "production"
? process.env.FRONTEND_URL_PROD  // ✅ Production frontend
: process.env.FRONTEND_URL_DEV; 

console.log(allowedOrigins);
app.use(cors({ origin: allowedOrigins, credentials: true }));


app.use('/verify-auth', verifyAuth);

app.get("/", async (req, res) => {
    const users = await User.find({});
    res.json(users);
})

app.use(express.json());
app.use('/auth', authRouter);
app.use(protect);
app.use('/todos', taskRouter);

if(process.env.NODE_ENV !== "test") app.listen(3000, () => console.log('Server running on port 5000'));

module.exports = app;



