import {Router} from "express";
import adminControllers from "../controllers/adminControllers.mjs";

const adminRouter = Router();

adminRouter.get("/",adminControllers.getUser)

export default adminRouter;