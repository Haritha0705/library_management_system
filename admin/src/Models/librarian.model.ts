export interface LibrarianModel {
    id:string | number;
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    image?: File | string;
}

export interface LibrarianResponse {
    token?:string;
    success:boolean;
    data:LibrarianModel[]
}