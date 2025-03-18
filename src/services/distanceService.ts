import { ApiResponse } from "@/types/Response";
import { apiRequest } from "./api";
import { Distance } from "@/types/Stat";

export const getAllDistances = async (): Promise<ApiResponse<Distance[]>> => {
    const response = await apiRequest<Distance[]>("/distance", "GET");
    return response
}
