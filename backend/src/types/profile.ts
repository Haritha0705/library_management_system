import { Request } from "express";

export interface ProfileReq extends Request {
    params: {
        id?: string;
        role?: "member" | "librarian";
    };
}

export interface Profile {
    _id: string;
    image: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    full_name?:string;
    phone?:string;
    address?:string;
    status:'issued' | 'returned' | 'overdue'
}

export interface UpdateProfile {
    image?: string;
    full_name?:string;
    phone?:string;
    address?:string;
}

export interface ProfileRes {
    success: boolean;
    status?: number;
    data?: Profile | undefined ;
    message?:string
}

export interface UpdateProfileRes {
    success: boolean;
    status: number;
    data?: UpdateProfile | undefined ;
    message?:string
}