import {Router} from "express";
import {loginAdmin} from "../controllers/adminControllers.mjs";

const adminRouter = Router();

adminRouter.post("/login",loginAdmin)

export default adminRouter;