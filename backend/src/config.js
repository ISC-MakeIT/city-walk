require("dotenv").config();

module.exports = {
    port: process.env.PORT || 3001,
    db: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASS || "password",
        database: process.env.DB_NAME || "hackathon",
        port: process.env.DB_PORT || 3306
    },
    corsOptions: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    },
    JWT_SECRET: process.env.JWT_SECRET || "1230006"
};
