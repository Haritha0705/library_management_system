import {Router} from "express";
import {
    addLibrarian,
    deleteLibrarian,
    getAllLibrarian,
    getAllMemers,
    loginAdmin
} from "../controllers/adminControllers.mjs";
import authAdmin from "../middlewares/authAdmin.mjs";

const adminRouter = Router();

//Auth Routes
adminRouter.post("/login",loginAdmin)

//Member Route
adminRouter.get("/get-allMembers",authAdmin,getAllMemers)

//Librarian Routes
adminRouter.post("/add-librarian",authAdmin,addLibrarian)
adminRouter.get("/get-allLibrarian",authAdmin,getAllLibrarian)
adminRouter.delete("/delete-librarian",authAdmin,deleteLibrarian)

export default adminRouter;