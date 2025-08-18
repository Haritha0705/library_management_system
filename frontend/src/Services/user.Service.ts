import AxiosService from "./axios.service.ts";
import BackendEndpoints from "../Constants/backend-endpoints.ts";
import type {UserResponse} from "../Model/user.model.ts";

export const getProfile = async (id:string,role:string,token:string):Promise<UserResponse>=>{
    try {
        const apiResponse = await AxiosService.get<UserResponse>(
            `${BackendEndpoints.GET_USER_PROFILE}/${role}/${id}`,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        return apiResponse.data
    } catch (apiError) {
        throw apiError;
    }
}