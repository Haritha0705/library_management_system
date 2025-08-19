import type {BookResponse,BooksResponse} from "../Model/book.model.ts";
import AxiosService from "./axios.service.ts";
import BackendEndpoints from "../Constants/backend-endpoints.ts";
import type {BorrowResponse} from "../Model/borrow-book.model.ts";
import type {ReturnResponse} from "../Model/return-book.model.ts";
import type {BookBorrowResponse} from "../Model/user.model.ts";

export const getAllBooks = async (token:string):Promise<BooksResponse>=>{
    try {
        const apiResponse = await AxiosService.get<BooksResponse>(
            BackendEndpoints.Fetch_Books,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        return apiResponse.data
    }catch (apiError) {
        throw apiError;
    }
}

export const bookById = async (bookId:string,token:string):Promise<BookResponse>=>{
    try {
        const apiResponse = await AxiosService.get<BookResponse>(
            `${BackendEndpoints.BOOK_BY_ID}/${bookId}`,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        return apiResponse.data
    }catch (apiError) {
        throw apiError;
    }
}

export const borrowBookById =  async (bookId:string,memberId:string,token:string): Promise<BorrowResponse>=>{
    try {
        const apiResponse = await AxiosService.post<BorrowResponse>(
            `${BackendEndpoints.BORROW_BOOK}/${bookId}/${memberId}`,
            {},
            {headers: {Authorization: `Bearer ${token}`}}
        )
        return apiResponse.data
    }catch (apiError) {
        throw apiError;
    }
}

export const returnBookById =  async (bookId:string,memberId:string,token:string): Promise<ReturnResponse>=>{
    try {
        const apiResponse = await AxiosService.post<ReturnResponse>(
            `${BackendEndpoints.RETURN_BOOK}/${bookId}/${memberId}`,
            {},
            {headers: {Authorization: `Bearer ${token}`}}
        )
        return apiResponse.data
    }catch (apiError) {
        throw apiError;
    }
}

export const checkBookBorrow =  async (bookId:string,memberId:string,token:string): Promise<BookBorrowResponse>=>{
    try {
        const apiResponse = await AxiosService.post<BookBorrowResponse>(
            BackendEndpoints.CHECK_BOOK_BORROW,
            {bookId,memberId},
            {headers: {Authorization: `Bearer ${token}`}}
        )
        return apiResponse.data
    }catch (apiError) {
        throw apiError;
    }
}