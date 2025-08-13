import {Router} from "express";
import {authMiddleware} from "../middlewares/authMiddlewares.mjs";
import {roleMiddleware} from "../middlewares/roleMiddlewares.mjs";
import {
    addLibrarian,
    deleteLibrarian,
    getAllLibrarian,
    getAllMembers
} from "../controllers/dashboardControllers.mjs";
import upload from "../middlewares/multer.mjs";

const dashboardRoutes = Router()

dashboardRoutes.get("/get-allLibrarian",authMiddleware,roleMiddleware("admin"),getAllLibrarian)
dashboardRoutes.post("/add-librarian",authMiddleware,roleMiddleware("admin"),upload.single('image'),addLibrarian)
dashboardRoutes.delete("/delete-librarian/:id",authMiddleware,roleMiddleware("admin"),deleteLibrarian)

dashboardRoutes.get("/get-allMembers",authMiddleware,roleMiddleware("admin","librarian"),getAllMembers)

export default dashboardRoutes
