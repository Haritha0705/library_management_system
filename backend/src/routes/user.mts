import {Router} from "express";
import userControllers from "../controllers/userControllers.mjs";

const userRouter = Router();

userRouter.get("/",userControllers.getUser)

export default userRouter;