import { Request } from "express";

export interface LoginReq  extends Request{
    params: {
        id?: string;
        role?: "member" | "librarian" | "admin";
    };
}

export interface LoginRes {
    success:boolean,
    message:string
    data:{
        id:string,
        email:string
    },
    token:string
}
