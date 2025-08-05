import express from "express";
import cors from 'cors';
import "dotenv/config"
import memberRouter from "./routes/memberRoutes.mjs";
import adminRouter from "./routes/adminRoutes.mjs";
import librarianRouter from "./routes/librarianRoutes.mjs";
import connectDB from "./config/db.mjs";
import connectCloudinary from "./config/cloudinary.mjs";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/librarian",librarianRouter);
app.use("/api/v1/member",memberRouter);

// Start server
const startServer = async () => {
    try {
        await connectDB();
        await connectCloudinary();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
