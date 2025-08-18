import AxiosService from "./axios.service.ts";
import BackendEndpoints from "../Constants/backend-endpoints.ts";
import type {UserResponse, UserUpdateResponse} from "../Model/user.model.ts";

export const getProfile = async (id:string,token:string):Promise<UserResponse>=>{
    try {
        const apiResponse = await AxiosService.get<UserResponse>(
            `${BackendEndpoints.GET_USER_PROFILE}/${id}`,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        return apiResponse.data
    } catch (apiError) {
        throw apiError;
    }
}

export const updateProfile = async (id: string, token: string, payload: FormData):Promise<UserUpdateResponse>=>{
    try {
        const apiResponse = await AxiosService.put(
            `${BackendEndpoints.UPDATE_USER_PROFILE}/${id}`,
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
