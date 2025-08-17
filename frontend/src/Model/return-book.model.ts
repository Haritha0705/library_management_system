export interface ReturnModel {
    _id:string
    memberId:string,
    bookId:string,
    issueDate:string
    dueDate:string
    status:string
    returnDate:string
}

export interface ReturnResponse {
    success: boolean;
    message:string
    return?:ReturnModel
}

