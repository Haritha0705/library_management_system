import {Router} from "express";
import {getProfile, loginMember, logoutMember, registerMember} from "../controllers/memberControllers.mjs";
import authMember from "../middlewares/authUser.mjs";

const memberRouter = Router();

memberRouter.post("/register", registerMember);
memberRouter.post("/login", loginMember);
memberRouter.post("/logout", logoutMember);

memberRouter.get("/get-profile",authMember,getProfile)

export default memberRouter;
