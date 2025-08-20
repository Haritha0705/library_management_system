import AxiosService from "./axios-service";
import BackendEndpoints from "../Constants/backend-endpoints";
import type {BookResponse} from "../Models/book.model";

export const addLibrarian = async (formData: FormData,token:string): Promise<any> => {
    try {
        const apiResponse = await AxiosService.post(
            BackendEndpoints.ADD_LIBRARIAN,
            formData,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        return apiResponse.data;
    } catch (apiError) {
        throw apiError;
    }
};

export const addBook = async (formData: FormData,token:string): Promise<BookResponse> => {
    try {
        const apiResponse = await AxiosService.post(
            BackendEndpoints.ADD_BOOK,
            formData,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        return apiResponse.data;
    } catch (apiError) {
        throw apiError;
    }
};