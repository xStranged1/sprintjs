import { ApiResponse } from "@/types/Response";
import { BaseSprint, Filter, Sprint } from "@/types/Sprint";
import { apiRequest } from "./api";
import { format } from "date-fns";
import { IPersonalRecord } from "@/types/Stat";

export interface ResCreateSprint {
    newSprint: Sprint,
    newPersonalRecord?: IPersonalRecord
}

export const createSprint = async (sprint: BaseSprint, token?: string): Promise<ApiResponse<ResCreateSprint>> => {
    const response = await apiRequest<ResCreateSprint>('/sprint', 'POST', token, sprint)
    return response
}

export const getAllSprints = async (token?: string): Promise<ApiResponse<Sprint[]>> => {
    const response = await apiRequest<Sprint[]>("/sprint", "GET", token);
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

    const fechaInicio = new Date(Math.min(...fechas as any));
    const fechaFin = new Date(Math.max(...fechas as any));

    // Iterar sobre el rango de fechas
    for (let d = fechaInicio; d <= fechaFin; d.setDate(d.getDate() + 1)) {
        const fecha = format(d, 'dd/MM/yyyy');
        const sprintsFecha = sprints.filter(sprint => format(sprint.date, 'dd/MM/yyyy') === fecha);

        if (sprintsFecha.length > 0) {
            resultado.push(...sprintsFecha);
        } else {
            resultado.push({ name: "vacio", date: d.toISOString(), distance: 0, time: 0 })
        }
    }

    return resultado;
}

export const filterSprints = (sprints: Sprint[], filter: Filter): Sprint[] => {
    let filteredSprints = structuredClone(sprints)
    if (filter.takeBreak != undefined) {
        filteredSprints = sprints.filter(sprint => sprint.takeBreak === filter.takeBreak)
    }

    if (filter.distanceRange) {
        let min = filter.distanceRange.min ?? 0
        let max = filter.distanceRange.max ?? Infinity
        filteredSprints = filteredSprints.filter(sprint => (sprint.distance > min && sprint.distance < max))
    }
    return filteredSprints
}

export const filterDateSprint = (sprints: Sprint[], date: string): Sprint[] => {

    const filteredSprints = sprints.filter((sprint) => {
        const dateSprint = new Date(sprint.date);
        const now = new Date();
        let daysToSubtract = 90;

        if (date === "7d") {
            daysToSubtract = 7;
        }
        if (date === "30d") {
            daysToSubtract = 30;
        }
        if (date === "90d") {
            daysToSubtract = 90;
        }
        if (date === "180d") {
            daysToSubtract = 180;
        }
        if (date === "365d") {
            daysToSubtract = 365;
        }
        const pastDate = new Date(now);
        pastDate.setDate(now.getDate() - daysToSubtract);
        return dateSprint >= pastDate;
    });
    return filteredSprints
}