import express from "express";
import "dotenv/config"
import userRouter from "./routes/user.mjs";
import connectDB from "./config/db.mjs";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())

app.use("/api/v1",userRouter);


// Start server
connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((e)=>{
    console.log(e)
})


