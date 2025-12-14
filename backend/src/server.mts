import express from "express";
import cors from 'cors';
import "dotenv/config"
import connectDB from "./config/db.mjs";
import connectCloudinary from "./config/cloudinary.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import bookRoutes from "./routes/bookRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import dashboardRoutes from "./routes/dashboardRoutes.mjs";

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    "https://library-management-system-eight-peach.vercel.app",
    "https://library-management-system-kgjl.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/book",bookRoutes);
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/dashboard",dashboardRoutes);

const startServer = async () => {
    try {
        await connectDB();
        await connectCloudinary();

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
