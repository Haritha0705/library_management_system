import {Router} from "express";
import {loginMember, logoutMember, registerMember} from "../controllers/memberControllers.mjs";

const memberRouter = Router();

memberRouter.post("/register", registerMember);
memberRouter.post("/login", loginMember);
memberRouter.post("/logout", logoutMember);

export default memberRouter;
