import {Router} from "express";
import {
    getProfile,
    loginMember,
    logoutMember,
    registerMember,
    updateProfile
} from "../controllers/memberControllers.mjs";
import authMember from "../middlewares/authUser.mjs";
import {getBook} from "../controllers/librarianControllers.mjs";

const memberRouter = Router();

memberRouter.post("/register", registerMember);
memberRouter.post("/login", loginMember);
memberRouter.post("/logout", logoutMember);

memberRouter.get("/get-profile/:id",authMember,getProfile)
memberRouter.put("/update-profile/:id",authMember,updateProfile)

//Book Route
memberRouter.get("/get-book/:id",authMember,getBook)

export default memberRouter;

