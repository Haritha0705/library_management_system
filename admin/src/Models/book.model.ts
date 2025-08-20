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

export interface BookUpdateResponse {
    success:boolean
    message:string
    updatedBook:BookModel
}
