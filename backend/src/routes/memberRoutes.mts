import {Router} from "express";
import memberControllers from "../controllers/memberControllers.mjs";

const memberRouter = Router();

memberRouter.get("/",memberControllers.getUser)

export default memberRouter;