import {Router} from "express";
import {authMiddleware} from "../middlewares/authMiddlewares.mjs";
import {roleMiddleware} from "../middlewares/roleMiddlewares.mjs";
import upload from "../middlewares/multer.mjs";
import dashboardControllers from "../controllers/dashboardControllers.mjs";

const dashboardRoutes = Router()

dashboardRoutes.get("/get-allLibrarian",authMiddleware,roleMiddleware("admin"),dashboardControllers.getAllLibrarian)
dashboardRoutes.post("/add-librarian",authMiddleware,roleMiddleware("admin"),upload.single('image'),dashboardControllers.addLibrarian)
dashboardRoutes.delete("/delete-librarian/:id",authMiddleware,roleMiddleware("admin"),dashboardControllers.deleteLibrarian)
dashboardRoutes.get("/get-allMembers",authMiddleware,roleMiddleware("admin","librarian"),dashboardControllers.getAllMembers)
dashboardRoutes.get("/get-count",authMiddleware,roleMiddleware("admin","librarian"),dashboardControllers.librarianDashBoard)
dashboardRoutes.get("/get-borrowBookList",authMiddleware,roleMiddleware("admin","librarian"),dashboardControllers.borrowBooksList)

export default dashboardRoutes
