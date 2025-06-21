import express from "express";
import dotenv from 'dotenv';
import connectDB from './config/db.mjs';
import authRoutes from './routes/authRoutes.mjs';
import usersRoutes from './routes/userRoutes.mjs';
import bookRoutes from './routes/bookRoutes.mjs';
import errorHandler  from "./middleware/errorMiddleware"

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    try {
        res.json("Hello")
    }catch (e) {
        console.log(e)
    }
})

// app.use("/api/auth",authRoutes)
// app.use("/api/users",usersRoutes)
// app.use("/api/books",bookRoutes)
// app.use(errorHandler)

export default app;