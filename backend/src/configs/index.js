import dotenv from "dotenv";
dotenv.config();

console.log("👉 Loaded MONGODB_URL:", process.env.MONGODB_URL); // Add this

export default {
    DB_CONNECTION_STRING: process.env.MONGODB_URL,
};
