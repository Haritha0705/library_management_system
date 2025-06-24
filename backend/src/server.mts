import express from "express";
import "dotenv/config"
import connectDB from "./config/db.mjs";
import memberRouter from "./routes/memberRoutes.mjs";
import adminRouter from "./routes/adminRoutes.mjs";
//import librarianRouter from "./routes/librarianRoutes.mjs";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())

app.use("/api/v1/admin",adminRouter);
// app.use("/api/v1/librarian",librarianRouter);
app.use("/api/v1/member",memberRouter);

// Start server
connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((e)=>{
    console.log(e)
})


//mongodb+srv://Haritha:Haritha1234@cluster0.ta6u3yt.mongodb.net/notes_db?retryWrites=true&w=majority&appName=Cluster0