import AxiosService from "./axios-service";
import BackendEndpoints from "../Constants/backend-endpoints";

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
