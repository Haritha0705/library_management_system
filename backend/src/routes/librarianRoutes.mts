import {Router} from "express";
import {addBook, deleteBook, getAllBooks, updateBook} from "../controllers/librarianControllers.mjs";
import authLibrarian from "../middlewares/authLibrarian.mjs";
import {getAllMemers} from "../controllers/adminControllers.mjs";

const librarianRouter = Router();

//Librarian Routes
librarianRouter.get("/get-allMembers",authLibrarian,getAllMemers)

export default librarianRouter;