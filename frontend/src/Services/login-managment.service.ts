import AxiosService from "./axios.service";
import BackendEndpoints from "../Constants/backend-endpoints";

interface AuthRequestBody {
    email: string;
    password: string;
    name?: string;
}

export const loginUser = async (reqBody: AuthRequestBody) => {
    try {
        const response = await AxiosService.post(BackendEndpoints.LOGIN_USER, reqBody);
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Login failed");
    }
};

export const registerUser = async (reqBody: AuthRequestBody) => {
    try {
        const response = await AxiosService.post(BackendEndpoints.REGISTER_USER, reqBody);
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Registration failed");
    }
};
