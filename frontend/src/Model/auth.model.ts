export interface LoginModel {
    email:string,
    password:string,
    role:string
}

export interface LoginResponse {
    success: boolean;
    token: string;
    message: string;
}

export interface RegisterModel {
    username:string
    email:string,
    password:string,
    role:string
}

export interface RegisterResponse {
    success: boolean;
    token: string;
    message: string;
}
