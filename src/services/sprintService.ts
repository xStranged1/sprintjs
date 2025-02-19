import { ApiResponse } from "@/types/Response";
import { BaseSprint, Sprint } from "@/types/Sprint";
import { apiRequest } from "./api";

export const createSprint = async (sprint: BaseSprint): Promise<ApiResponse<Sprint>> => {
    const response = await apiRequest<Sprint>('/sprint', 'POST', sprint)
    return response
}

export const getAllSprints = async (): Promise<ApiResponse<Sprint[]>> => {
    const response = await apiRequest<Sprint[]>("/sprint", "GET");
    return response
}
