import {Router} from "express";
import {loginMember, registerMember} from "../controllers/memberControllers.mjs";

const memberRouter = Router();

memberRouter.post("/register", registerMember);
memberRouter.post("/login", loginMember);

export default memberRouter;
