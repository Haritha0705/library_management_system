export interface BookModel {
    title:string
    author:string
    category:string
    description:string
    availableCopies:string
    image: File | string;
}

export interface BookResponse {
    success:boolean;
    message:string;
}

