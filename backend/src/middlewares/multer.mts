import multer from "multer";
import {Request} from "express";

const storage = multer.diskStorage({
    filename:function (req:Request,file,callback) {
        callback(null,file.originalname)
    }
})

const upload = multer({storage})
export default upload