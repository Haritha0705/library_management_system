import {Router} from "express";
import {
    bookBorrow,
    bookReturn,
    bookSearch,
    getProfile,
    loginMember,
    logoutMember,
    registerMember,
    updateProfile
} from "../controllers/memberControllers.mjs";
import authMember from "../middlewares/authUser.mjs";
import {getAllBooks, getBook} from "../controllers/librarianControllers.mjs";
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
memberRouter.post("/book/:bId/borrow/:mId",authMember,bookBorrow)
memberRouter.post("/book/:bId/return/:mId",authMember,bookReturn)

//Search book
memberRouter.get("/search-book/:id",authMember,bookSearch)

//Get All Books
memberRouter.get("/get-allBooks/:id",authMember,getAllBooks)

export default memberRouter;

