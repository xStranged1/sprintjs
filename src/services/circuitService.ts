import { ApiResponse } from "@/types/Response";
import { Circuit } from "@/types/Sprint";
import { apiRequest } from "./api";

export const createCircuit = async (circuit: Omit<Circuit, 'id'>): Promise<ApiResponse<Circuit>> => {
    const response = await apiRequest<Circuit>('/circuit', 'POST', circuit)
    return response
}

export const getAllCircuits = async (): Promise<ApiResponse<Circuit[]>> => {
    const response = await apiRequest<Circuit[]>("/circuit", "GET");
    return response
}
