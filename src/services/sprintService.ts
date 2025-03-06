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

export const orderByDate = (sprints: Sprint[]): Sprint[] => {
    return sprints.sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return dateB.getTime() - dateA.getTime()
    })
}
export const orderByTime = (sprints: Sprint[]): Sprint[] => sprints.sort((a, b) => a.time - b.time)