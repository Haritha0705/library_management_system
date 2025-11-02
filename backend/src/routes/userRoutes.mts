import {Router} from "express";
import {authMiddleware} from "../middlewares/authMiddlewares.mjs";
import {roleMiddleware} from "../middlewares/roleMiddlewares.mjs";
import upload from "../middlewares/multer.mjs";
import userControllers from "../controllers/userControllers.mjs";

const userRoutes = Router();

userRoutes.get("/get-profile/:role/:id",authMiddleware,roleMiddleware("admin","librarian","member"),userControllers.getProfile)
userRoutes.put("/update-profile/:role/:id",authMiddleware,roleMiddleware("admin","librarian","member"),upload.single('image'),userControllers.updateProfile)
userRoutes.delete("/delete-profile/:role/:id",authMiddleware,roleMiddleware("admin","librarian","member"),userControllers.deleteProfile)

export default userRoutes;