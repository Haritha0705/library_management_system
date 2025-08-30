import AxiosService from "./axios-service.ts";
import BackendEndpoints from "../Constants/backend-endpoints.ts";
import type {SearchResponse} from "../Models/search.model.ts";
import type {BookUpdateResponse} from "../Models/book.model.ts";

export const searchBookByTitle =  async (query:string,token:string): Promise<SearchResponse>=>{
    try {
        const apiResponse = await AxiosService.get<SearchResponse>(
            `${BackendEndpoints.SEARCH_BOOK}?title=${query}`,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        return apiResponse.data
    }catch (apiError) {
        throw apiError;
    }
}

export const updateBook = async (id: string, token: string, payload: FormData):Promise<BookUpdateResponse>=>{
    try {
        const apiResponse = await AxiosService.put<BookUpdateResponse>(
            `${BackendEndpoints.UPDATE_BOOK_DATA}/${id}`,
            payload,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        return apiResponse.data
    } catch (apiError) {
        throw apiError;
    }
}

export const deleteBook = async (id: string, token: string):Promise<void>=>{
    try {
        const apiResponse = await AxiosService.delete(
            `${BackendEndpoints.DELETE_BOOK}/${id}`,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        return apiResponse.data
    } catch (apiError) {
        throw apiError;
    }
}