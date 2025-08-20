const BackendEndpoints = {
    //auth
    Login_Admin:"api/v1/auth/login",

    //add Librarian
    ADD_LIBRARIAN:"api/v1/dashboard/add-librarian",

    //get all Librarian
    ALL_LIBRARIANS:"api/v1/dashboard/get-allLibrarian",

    //delete Librarian
    DELETE_LIBRARIAN:"api/v1/dashboard/delete-librarian",

    //get all Members
    ALL_Members:"api/v1/dashboard/get-allMembers",

    //add Book
    ADD_BOOK:"api/v1/book/add-book",

    //Librarian DashBoard Counts
    DASHBOARD_COUNTS:"api/v1/dashboard/get-count",

    //Librarian and Admin Borrowed Books List
    BORROW_BOOK_LIST:"api/v1/dashboard/get-borrowBookList"

}

export default BackendEndpoints