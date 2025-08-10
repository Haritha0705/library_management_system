import type {LoginModel} from "../Models/login.model.ts";
import AxiosService from "./axios-service.ts";
import BackendEndpoints from "../Constants/backend-endpoints.ts"

export const loginAdmin = async (reqBody: LoginModel): Promise<LoginModel> => {
    try {
        const apiResponse = await AxiosService.post<LoginModel>(
            BackendEndpoints.Login_Admin,
            reqBody
        )
        return apiResponse.data;
    } catch (apiError) {
        throw apiError;
    }
}