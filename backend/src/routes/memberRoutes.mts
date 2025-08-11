import {Router} from "express";
import {
    bookBorrow,
    bookReturn,
    bookSearch,
    getProfile,
    updateProfile
} from "../controllers/memberControllers.mjs";
import {authMember} from "../middlewares/authMiddlewares.mjs";
import { getAllBooks} from "../controllers/librarianControllers.mjs";
import upload from "../middlewares/multer.mjs";

const memberRouter = Router();

//Member Routes
memberRouter.put("/update-profile/:id",authMember,upload.single('image'),updateProfile)

//Book Route


//Issue/Return/Overdue book
memberRouter.post("/book/:bId/borrow/:mId",authMember,bookBorrow)
memberRouter.post("/book/:bId/return/:mId",authMember,bookReturn)

//Search book
memberRouter.get("/search-book",authMember,bookSearch)

//Get All Books
memberRouter.get("/get-allBooks",authMember,getAllBooks)

export default memberRouter;
