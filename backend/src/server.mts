import express from "express";
import "dotenv/config"
import connectDB from "./config/db.mjs";
import memberRoutes from "./routes/memberRoutes.mjs";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())

app.use("/api/v1/member",memberRoutes);


// Start server
connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((e)=>{
    console.log(e)
})


