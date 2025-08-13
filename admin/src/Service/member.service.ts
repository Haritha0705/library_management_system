import AxiosService from "./axios-service.ts";
import BackendEndpoints from "../Constants/backend-endpoints.ts";
import type {MemberResponse} from "../Models/member.model.ts";

export const getAllMembers = async (token:string): Promise<MemberResponse[]> => {
    try {
        const apiResponse = await AxiosService.get<MemberResponse[]>(
            BackendEndpoints.ALL_Members,
            {headers: {Authorization: `Bearer ${token}`}}
        );
        return apiResponse.data;
    } catch (apiError) {
        throw apiError;
    }
};

