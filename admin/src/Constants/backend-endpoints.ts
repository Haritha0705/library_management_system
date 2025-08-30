const BackendEndpoints = {
    //auth
    Login_Admin:"api/v1/auth/login",

    //add DashBoard
    ADD_LIBRARIAN:"api/v1/dashboard/add-librarian",

    //get all DashBoard
    ALL_LIBRARIANS:"api/v1/dashboard/get-allLibrarian",

    //delete DashBoard
    DELETE_LIBRARIAN:"api/v1/dashboard/delete-librarian",

    //get all Members
    ALL_Members:"api/v1/dashboard/get-allMembers",

    //add Book
    ADD_BOOK:"api/v1/book/add-book",

    //delete Book
    DELETE_BOOK:"api/v1/book/delete-book",

    //DashBoard Counts
    DASHBOARD_COUNTS:"api/v1/dashboard/get-count",

    //DashBoard and Admin Borrowed Books List
    BORROW_BOOK_LIST:"api/v1/dashboard/get-borrowBookList",

    //Get User Profile
    GET_LIBRARIAN_PROFILE:"api/v1/user/get-profile/librarian",

    //Update User Profile
    UPDATE_LIBRARIAN_PROFILE:"api/v1/user/update-profile/librarian",

    //Search Book By Title
    SEARCH_BOOK:"api/v1/book/search-book",

    //Update Book Data
    UPDATE_BOOK_DATA:"api/v1/book/update-book"

}

export default BackendEndpoints