export interface BorrowBookListModel {
    memberId:string,
    bookId:string
    issueDate:string
    dueDate:string
    status:string
}

export interface BorrowBookListResponse {
    success:boolean
    data:BorrowBookListModel[]
}

