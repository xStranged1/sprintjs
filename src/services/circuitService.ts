import { ApiResponse } from "@/types/Response";
import { Circuit } from "@/types/Sprint";
import { apiRequest } from "./api";

export const createCircuit = async (circuit: Omit<Circuit, 'id'>, token?: string): Promise<ApiResponse<Circuit>> => {
    const response = await apiRequest<Circuit>('/circuit', 'POST', token, circuit)
    return response
}

export const getAllCircuits = async (token?: string): Promise<ApiResponse<Circuit[]>> => {
    const response = await apiRequest<Circuit[]>("/circuit", "GET", token);
    return response
}
