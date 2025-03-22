import { ApiResponse } from "@/types/Response";
import { apiRequest } from "./api";
import { IPersonalRecord } from "@/types/Stat";

export const getAllPersonalRecords = async (token?: string): Promise<ApiResponse<IPersonalRecord[]>> => {
    const response = await apiRequest<IPersonalRecord[]>("/personalRecord", "GET", token);
    return response
}

export const calculateAllPersonalRecords = async (token?: string): Promise<ApiResponse<IPersonalRecord[]>> => {
    const response = await apiRequest<IPersonalRecord[]>("/personalRecord", "POST", token);
    return response
}