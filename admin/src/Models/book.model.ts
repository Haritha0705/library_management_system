export interface BookModel {
    _id:string
    title:string
    author:string
    category:string
    description:string
    availableCopies:number
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
