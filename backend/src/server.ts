import express,{Request,Response} from 'express';
import dotenv from "dotenv";
//import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8070;

// middleware
// app.use(cors({
//     origin:"http://localhost:5173"
// }));
app.use(express.json());

// routes
app.get('/', (_req: Request, res: Response) => {
    res.send('Hello, TypeScript + Node.js + Express!');
});

app.use("/api/books",bookRoutes)
app.use("/api/users",usersRoutes)
app.use("/api/loans",loansRoutes)

// start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
