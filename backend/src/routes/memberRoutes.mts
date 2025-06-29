import {Router} from "express";
import {
    bookIssue, bookReturn,
    getProfile, issueBooks,
    loginMember,
    logoutMember, overdueBooks,
    registerMember,
    updateProfile
} from "../controllers/memberControllers.mjs";
import authMember from "../middlewares/authUser.mjs";
import {getBook} from "../controllers/librarianControllers.mjs";
import upload from "../middlewares/multer.mjs";

const memberRouter = Router();

//Auth Routes
memberRouter.post("/register", registerMember);
memberRouter.post("/login", loginMember);
memberRouter.post("/logout", logoutMember);

//Member Routes
memberRouter.get("/get-profile/:id",authMember,getProfile)
memberRouter.put("/update-profile/:id",authMember,upload.single('image'),updateProfile)

//Book Route
memberRouter.get("/get-book/:id",authMember,getBook)

//Issue/Return/Overdue book
memberRouter.post("/book-issue",authMember,bookIssue)
memberRouter.post("/book-return/:id",authMember,bookReturn)
memberRouter.get("/issued-books",authMember,issueBooks)
memberRouter.get("/borrowed-books",authMember,overdueBooks)


export default memberRouter;

