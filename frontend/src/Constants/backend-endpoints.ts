const BackendEndpoints = {
    //register
    REGISTER_USER:"/api/v1/auth/register",

    //login
    LOGIN_USER:"/api/v1/auth/login",

    //Get All Books
    Fetch_Books:"/api/v1/book/get-allBooks",

    //Book By id
    BOOK_BY_ID:"/api/v1/book/get-book",

    //Borrow Book
    BORROW_BOOK:"api/v1/book/borrow",

    //Return Book
    RETURN_BOOK:"api/v1/book/return",

    //Get User Profile
    GET_USER_PROFILE:"api/v1/user/get-profile/member",

    //Update User Profile
    UPDATE_USER_PROFILE:"api/v1/user/update-profile/member",

    //Check Book Borrow
    CHECK_BOOK_BORROW:"api/v1/book/checkBookBorrow",
}
export default BackendEndpoints

