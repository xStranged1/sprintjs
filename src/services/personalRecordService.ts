import { ApiResponse } from "@/types/Response";
import { apiRequest } from "./api";
import { IPersonalRecord } from "@/types/Stat";

export const getAllPersonalRecords = async (): Promise<ApiResponse<IPersonalRecord[]>> => {
    const response = await apiRequest<IPersonalRecord[]>("/personalRecord", "GET");
    return response
}

export const calculateAllPersonalRecords = async (): Promise<ApiResponse<IPersonalRecord[]>> => {
    const response = await apiRequest<IPersonalRecord[]>("/personalRecord", "POST");
    return response
}