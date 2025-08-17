import type {BookResponse,BooksResponse} from "../Model/book.model.ts";
import AxiosService from "./axios.service.ts";
import BackendEndpoints from "../Constants/backend-endpoints.ts";

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

export const bookById = async (id:string,token:string):Promise<BookResponse>=>{
    try {
        const apiResponse = await AxiosService.get<BookResponse>(
            `${BackendEndpoints.BOOK_BY_ID}/${id}`,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        return apiResponse.data
    }catch (apiError) {
        throw apiError;
    }
}