export interface BorrowModel {
    _id:string
    memberId:string,
    bookId:string,
    issueDate:string
    dueDate:string
    status:string
}

export interface BorrowResponse {
    success: boolean;
    message:string
    borrow?:BorrowModel
}

export interface BookBorrowResponse {
    success:boolean
    message:string
}