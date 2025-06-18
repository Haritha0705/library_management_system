import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth",authRoutes)
app.use("/api/users",usersRoutes)
app.use("/api/books",bookRoutes)
app.use(errorHandler)

export default app;