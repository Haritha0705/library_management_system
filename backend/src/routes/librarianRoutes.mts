import {Router} from "express";
import {
    addBook,
    deleteBook,
    getAllBooks,
    librarianLogin,
    updateBook
} from "../controllers/librarianControllers.mjs";
import authLibrarian from "../middlewares/authLibrarian.mjs";
import {getAllMemers} from "../controllers/adminControllers.mjs";


const librarianRouter = Router();

//Login Route
librarianRouter.post("/login",librarianLogin)

//Book Routes
librarianRouter.post("/add-book",authLibrarian,addBook)
librarianRouter.get("/get-allBooks",authLibrarian,getAllBooks)
librarianRouter.put("/update-book/:id",authLibrarian,updateBook)
librarianRouter.delete("/delete-book/:id",authLibrarian,deleteBook)

//Member Routes
librarianRouter.get("/get-allMembers",authLibrarian,getAllMemers)

export default librarianRouter;