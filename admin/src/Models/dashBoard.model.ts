export interface DashBoardModel {
    memberCount:string
    librarianCount:string
    bookCount:string
    bookAuthorCount:string
    borrowedBooksCount:string
    overdueBooksCount:string
    bookCategoryCount:string
}

export interface DashBoardResponse {
    success:boolean
    data:DashBoardModel
}
