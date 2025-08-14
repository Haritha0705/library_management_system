import AxiosService from "./axios.service.ts";
import BackendEndpoints from "../Constants/backend-endpoints.ts";
import type {LoginModel} from "../Model/login.model.ts";

export const loginMember = async (reqBody:LoginModel):Promise<LoginModel>=>{
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