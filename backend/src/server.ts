import express,{Request,Response} from 'express';
import dotenv from "dotenv"

dotenv.config();

const app = express();
const PORT = process.env.PORT ;


app.get('/', (_:Request, res:Response) => {
    res.send('Hello, TypeScript + Node.js + Express!');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
