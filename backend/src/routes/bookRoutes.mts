import {Router} from "express";
import {authMiddleware} from "../middlewares/authMiddlewares.mjs";
import {roleMiddleware} from "../middlewares/roleMiddlewares.mjs";
import {
    addBook,
    deleteBook,
    getAllBooks,
    updateBook,
    bookSearchByTitle,
    getBook,
    bookBorrow,
    bookReturn,
    bookAlreadyBorrow, bookBorrowHistory
} from "../controllers/bookControllers.mjs";
import upload from "../middlewares/multer.mjs";

const bookRoutes = Router();

//Book Routes

bookRoutes.get("/get-book/:bookId",authMiddleware,roleMiddleware("librarian","member"),getBook)
bookRoutes.get("/get-allBooks",getAllBooks)

bookRoutes.get("/search-book",authMiddleware,roleMiddleware("librarian","member"),bookSearchByTitle)
bookRoutes.post("/borrow/:bookId/:memberId",authMiddleware,roleMiddleware("member"),bookBorrow)
bookRoutes.post("/return/:bookId/:memberId",authMiddleware,roleMiddleware("member"),bookReturn)

bookRoutes.post("/add-book",authMiddleware,roleMiddleware("librarian"),upload.single('image'),addBook)
bookRoutes.put("/update-book/:id",authMiddleware,roleMiddleware("librarian"),upload.single('image'),updateBook)
bookRoutes.delete("/delete-book/:id",authMiddleware,roleMiddleware("librarian"),deleteBook)

bookRoutes.post("/checkBookBorrow",authMiddleware,roleMiddleware("member"),bookAlreadyBorrow)
bookRoutes.post("/borrowHistory",authMiddleware,roleMiddleware("member"),bookBorrowHistory)

export default bookRoutes

