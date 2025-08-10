import {Router} from "express";
import {userLogin} from "../controllers/authControllers.mjs";

const authRouter = Router()

//Auth Routes
authRouter.post("/login",userLogin)

export default authRouter