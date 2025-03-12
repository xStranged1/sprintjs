import { ApiResponse } from "@/types/Response";
import { BaseSprint, Sprint } from "@/types/Sprint";
import { apiRequest } from "./api";
import { format } from "date-fns";

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

export const completeDates = (sprints: Sprint[]) => {
    const resultado = [];
    const fechas = sprints.map(sprint => new Date(sprint.date));

    // Establecer el rango de fechas
    const fechaInicio = new Date(Math.min(...fechas as any));
    const fechaFin = new Date(Math.max(...fechas as any));

    // Iterar sobre el rango de fechas
    for (let d = fechaInicio; d <= fechaFin; d.setDate(d.getDate() + 1)) {
        const fechaActual = format(d, 'dd/MM/yyyy');
        const sprint = sprints.find(sprint => format(sprint.date, 'dd/MM/yyyy') === fechaActual);

        if (sprint) {
            resultado.push(sprint);  // Si existe un evento, agregarlo
        } else {
            resultado.push({ name: "vacio", date: d.toISOString(), distance: 0, time: 0 })
        }
    }

    return resultado;
}