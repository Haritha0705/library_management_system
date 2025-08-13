export interface LibrarianModel {
    _id:string;
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    image?: File | string;
}

export interface LibrarianResponse {
    success:boolean;
    data:LibrarianModel[]
}