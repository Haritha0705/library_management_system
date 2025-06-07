import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import logger from "./utils/logger";

const app = express();
const PORT = process.env.PORT || "8090";
app.use(cors());
app.use(express.json({limit:"20md"}));

app.get("/",(req,res) =>{
    res.send("<h2>Libriry managemt System API</h2>");
    next();
} )

app.listen(PORT,()=>{
    logger.info("this is testing")
    console.log(`Server is up and runing on port ${PORT}`)
})