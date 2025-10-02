export interface LoginModel {
    email?:string,
    password?:string,
    role?:string
}

export interface LoginResponse {
    success: boolean;
    token?: string;
    message?: string;
}