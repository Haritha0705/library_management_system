import express from "express";
import 'dotenv/config';
// import connectDB from './config/db.mjs';

const PORT = process.env.PORT || 8070;


// connectDB()
const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
