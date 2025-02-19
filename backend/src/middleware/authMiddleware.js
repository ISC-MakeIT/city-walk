const jwt = require("jsonwebtoken");
const config = require("../config");

const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        req.user = jwt.verify(token, config.JWT_SECRET); // 🔹 直接代入
        next();
    } catch (error) {
        res.status(403).json({ message: "Forbidden" });
    }
};

module.exports = authenticate;