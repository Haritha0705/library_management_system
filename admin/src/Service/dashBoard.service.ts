import AxiosService from "./axios-service.ts";
import BackendEndpoints from "../Constants/backend-endpoints.ts";
import type {DashBoardResponse} from "../Models/dashBoard.model.ts";

export const librarianDashBoard = async (token:string):Promise<DashBoardResponse>=>{
    try {
        const apiResponse = await AxiosService.get<DashBoardResponse>(
            BackendEndpoints.DASHBOARD_COUNTS,
            {headers: {Authorization: `Bearer ${token}`}}
        );
        return apiResponse.data;
    }catch (apiError) {
        throw apiError;
    }
}
