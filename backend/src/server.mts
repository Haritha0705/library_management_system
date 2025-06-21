import express from "express";
import "dotenv/config"
import userRouter from "./routes/user.mjs";

const app = express();

app.use(express.json())

app.use("/api/v1",userRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
