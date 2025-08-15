import type {BookResponse} from "../Model/book.model.ts";
import AxiosService from "./axios.service.ts";
import BackendEndpoints from "../Constants/backend-endpoints.ts";

export const getAllBooks = async (token:string):Promise<BookResponse>=>{
    try {
        const apiResponse = await AxiosService.get<BookResponse>(
            BackendEndpoints.Fetch_Books,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        return apiResponse.data
    }catch (apiError) {
        throw apiError;
    }
}
