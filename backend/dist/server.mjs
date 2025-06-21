import express from "express";
import "dotenv/config";
import rootRouter from "./routes/index.mjs";
const app = express();
app.use(express.json());
app.use(rootRouter);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
