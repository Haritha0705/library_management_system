import AxiosService from "./axios-service.ts";
import BackendEndpoints from "../Constants/backend-endpoints.ts";
import type {LibrarianResponse} from "../Models/librarian.model.ts";

export const getAllLibrarians = async (token:string): Promise<LibrarianResponse> => {
    try {
        const apiResponse = await AxiosService.get<LibrarianResponse>(
            BackendEndpoints.ALL_LIBRARIANS,
            {headers: {Authorization: `Bearer ${token}`}}
        );
        return apiResponse.data;
    } catch (apiError) {
        throw apiError;
    }
};

export const deleteLibrarian = async (id:string,token:string):Promise<void>=>{
    try {
        const apiResponse = await AxiosService.delete(
            `${BackendEndpoints.DELETE_LIBRARIAN}/${id}`,
            {headers: {Authorization: `Bearer ${token}`}}
        );
        return apiResponse.data;
    }catch (apiError) {
        throw apiError;
    }
}
