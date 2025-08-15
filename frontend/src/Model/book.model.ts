export interface BookModel {
    _id:string
    title:string
    author:string
    image:string
    category:string
    description:string
    availableCopies:string
}

export interface BookResponse {
    success:boolean;
    data:BookModel[]
}