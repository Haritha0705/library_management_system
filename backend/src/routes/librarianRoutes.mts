import {Router} from "express";
import {addBook, deleteBook, getAllBooks, getBook, librarianLogin, updateBook} from "../controllers/librarianControllers.mjs";
import authLibrarian from "../middlewares/authLibrarian.mjs";
import {getAllMemers} from "../controllers/adminControllers.mjs";

const librarianRouter = Router();

//Auth Routes
librarianRouter.post("/login",librarianLogin)

//Book Routes
librarianRouter.post("/add-book",authLibrarian,addBook)
librarianRouter.get("/get-book/:bId",authLibrarian,getBook)
librarianRouter.get("/get-allBooks",authLibrarian,getAllBooks)
librarianRouter.put("/update-book/:id",authLibrarian,updateBook)
librarianRouter.delete("/delete-book/:id",authLibrarian,deleteBook)

//Librarian Routes
librarianRouter.get("/get-allMembers",authLibrarian,getAllMemers)

export default librarianRouter;