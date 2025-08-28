export interface LoginBody {
    email:string
    password:string
    role:"member" | "librarian" | "admin"
}

export interface RegisterBody {
    username:string
    email:string
    password:string
    role:"member"
}

export interface LoginRes {
    success:boolean
    status:number
    message:string;
    data?:{
        id:string;
        email:string;
        role:string
    }
    token?:string;
}

export interface RegisterRes {
    success:boolean
    status:number
    message:string;
    data?:{
        id:string;
        email:string;
        username:string;
        role:string;
    }
    token?:string;
}