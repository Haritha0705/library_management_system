import {Router} from "express";
import {authMiddleware} from "../middlewares/authMiddlewares.mjs";
import {roleMiddleware} from "../middlewares/roleMiddlewares.mjs";
import upload from "../middlewares/multer.mjs";
import bookControllers from "../controllers/bookControllers.mjs";

const bookRoutes = Router();

//Book Routes

bookRoutes.get("/get-book/:bookId",bookControllers.getBook)

bookRoutes.get("/get-allBooks",bookControllers.getAllBooks)

bookRoutes.get("/search-book",bookControllers.bookSearchByTitle)
bookRoutes.post("/borrow/:bookId/:memberId",authMiddleware,roleMiddleware("member"),bookControllers.bookBorrow)
bookRoutes.post("/return/:bookId/:memberId",authMiddleware,roleMiddleware("member"),bookControllers.bookReturn)
//
bookRoutes.post("/add-book",authMiddleware,roleMiddleware("librarian"),upload.single('image'),bookControllers.addBook)
bookRoutes.put("/update-book/:id",authMiddleware,roleMiddleware("librarian"),upload.single('image'),bookControllers.updateBook)
bookRoutes.delete("/delete-book/:id",authMiddleware,roleMiddleware("librarian"),bookControllers.deleteBook)
//
bookRoutes.post("/checkBookBorrow",authMiddleware,roleMiddleware("member"),bookControllers.bookAlreadyBorrow)
bookRoutes.post("/borrowHistory",authMiddleware,roleMiddleware("member"),bookControllers.bookBorrowHistory)

export default bookRoutes

