import {Router} from "express";
import {userLogin, userRegister} from "../controllers/authControllers.mjs";

const authRoutes = Router()

//Auth Routes
authRoutes.post("/login",userLogin)
authRoutes.post("/register",userRegister)

export default authRoutes