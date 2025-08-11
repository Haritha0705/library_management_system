import {Router} from "express";

const adminRoutes = Router()

adminRoutes.get("/get-allMembers")
adminRoutes.get("/get-allLibrarian")
adminRoutes.post("/add-librarian")
adminRoutes.delete("/delete-librarian/:id")
