import {Request, Response} from "express";
import librarianService, {LibrarianService} from "../service/librarianService.mjs";

class LibrarianControllers {

    private librarianService :LibrarianService;

    constructor(librarianService:LibrarianService) {
        this.librarianService = librarianService
    }


    getUser=(_:Request,res:Response):void=>{
        const librarian : string[]|null = this.librarianService.getUsers(1,10);
        if (librarian === null){
            res.status(400).send('error')
        }
        res.status(200).json({
            data:librarian,
        })
    }
}

export default new LibrarianControllers(librarianService);