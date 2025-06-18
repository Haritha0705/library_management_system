import express from 'express';
import dotenv from "dotenv";
//import cors from "cors";
import app from "./app.ts"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8070;



// start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
