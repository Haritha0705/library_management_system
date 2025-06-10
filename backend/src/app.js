import express from "express";
import cors from "cors";
import logger from "./utils/logger.js";
import "dotenv/config";
import { connect } from "./utils/databaseConnection.js";

const app = express();
const PORT = process.env.PORT || "8090";
const HOST = "127.0.0.1"; // Added missing HOST

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "20mb" }));

// Route
app.get("/", (req, res) => {
    res.send("<h2>📚 Library Management System API</h2>");
});

// Connect to DB
connect();

// Start Server
app.listen(PORT, HOST, () => {
    logger.info(`🚀 Server is up and running at http://${HOST}:${PORT}`);
});
