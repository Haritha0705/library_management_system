import express from "express";
import rootRouter from "./routes/index.mjs";

const app = express();

app.use(express.json())

app.use(rootRouter);

app.listen(8080,()=>{
    console.log("Server runing")
})