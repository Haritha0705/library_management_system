import {Router} from "express";
import {
    bookBorrow,
    bookReturn,
    bookSearch,
    getProfile,
    updateProfile
} from "../controllers/memberControllers.mjs";
import authMember from "../middlewares/authUser.mjs";
import { getAllBooks,getBook} from "../controllers/librarianControllers.mjs";
import upload from "../middlewares/multer.mjs";

const memberRouter = Router();

//Member Routes
memberRouter.get("/get-profile/:id",authMember,getProfile)
memberRouter.put("/update-profile/:id",authMember,upload.single('image'),updateProfile)

//Book Route
memberRouter.get("/get-book/:bId",authMember,getBook)

//Issue/Return/Overdue book
memberRouter.post("/book/:bId/borrow/:mId",authMember,bookBorrow)
memberRouter.post("/book/:bId/return/:mId",authMember,bookReturn)

//Search book
memberRouter.get("/search-book",authMember,bookSearch)

//Get All Books
memberRouter.get("/get-allBooks",authMember,getAllBooks)

export default memberRouter;

