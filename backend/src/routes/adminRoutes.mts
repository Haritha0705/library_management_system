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

adminRouter.post("/login",loginAdmin)

adminRouter.post("/add-librarian",authAdmin,addLibrarian)
adminRouter.get("/get-allMembers",authAdmin,getAllMemers)
adminRouter.get("/get-allLibrarian",authAdmin,getAllLibrarian)
adminRouter.delete("/delete-librarian",authAdmin,deleteLibrarian)

export default adminRouter;