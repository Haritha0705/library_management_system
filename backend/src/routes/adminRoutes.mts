import {Router} from "express";
import {addLibrarian, deleteLibrarian, getAllLibrarian, getAllMemers} from "../controllers/adminControllers.mjs";
import authAdmin from "../middlewares/authAdmin.mjs";
import upload from "../middlewares/multer.mjs";

const adminRouter = Router();

//Member Route
adminRouter.get("/get-allMembers",authAdmin,getAllMemers)

//Librarian Routes
adminRouter.post("/add-librarian",authAdmin,upload.single('image'),addLibrarian)
adminRouter.get("/get-allLibrarian",authAdmin,getAllLibrarian)
adminRouter.delete("/delete-librarian/:id",authAdmin,deleteLibrarian)

export default adminRouter;