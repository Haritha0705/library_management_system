import AxiosService from "./axios.service.ts";
import BackendEndpoints from "../Constants/backend-endpoints.ts";
import type {LoginModel, RegisterModel} from "../Model/auth.model.ts";

export const loginMember = async (reqBody:LoginModel)=>{
    try {
        const apiResponse = await AxiosService.post<LoginModel>(
            BackendEndpoints.LOGIN_USER,
            reqBody
        )
        return apiResponse.data
    } catch (apiError) {
        throw apiError;
    }
}

export const registerMember = async (reqBody:RegisterModel)=>{
    try {
        const apiResponse = await AxiosService.post<RegisterModel>(
            BackendEndpoints.REGISTER_USER,
            reqBody
        )
        return apiResponse.data
    } catch (apiError) {
        throw apiError;
    }
}