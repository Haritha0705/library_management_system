import express from "express";
import 'dotenv/config';
import connectDB from "./config/db.mjs";

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});