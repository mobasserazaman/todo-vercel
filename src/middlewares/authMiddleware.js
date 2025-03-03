const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }    

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.username = decoded.username;
    next();
}

module.exports = protect;