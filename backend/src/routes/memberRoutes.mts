import {Router} from "express";
import {
    bookIssue,
    getProfile,
    loginMember,
    logoutMember,
    registerMember,
    updateProfile
} from "../controllers/memberControllers.mjs";
import authMember from "../middlewares/authUser.mjs";
import {getBook} from "../controllers/librarianControllers.mjs";

const memberRouter = Router();

//Auth Routes
memberRouter.post("/register", registerMember);
memberRouter.post("/login", loginMember);
memberRouter.post("/logout", logoutMember);

//Member Routes
memberRouter.get("/get-profile/:id",authMember,getProfile)
memberRouter.put("/update-profile/:id",authMember,updateProfile)

//Book Route
memberRouter.get("/get-book/:id",authMember,getBook)

//Issue book
memberRouter.post("/book-issue",authMember,bookIssue)

export default memberRouter;

