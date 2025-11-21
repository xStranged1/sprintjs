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
    const newSprint = structuredClone(sprint)
    if (sprint.intervals && sprint.takeBreak) {
        if (sprint.intervals.length > 0) {
            let totalD = 0
            let totalTime = 0
            let totalLaps = 0
            for (const interval of sprint.intervals) {
                totalD = totalD + interval.distance
                totalTime = totalTime + interval.time
                if (interval.numberOfLaps) totalLaps = totalLaps + interval.numberOfLaps
            }
            newSprint.distance = totalD
            newSprint.time = totalTime
            if (totalLaps) newSprint.numberOfLaps = totalLaps
        }
    }
    // console.log("newSprint");
    // console.log(newSprint);
    const response = await apiRequest<ResCreateSprint>('/sprint', 'POST', token, newSprint)
    return response
}

export const getAllSprints = async (token?: string): Promise<ApiResponse<Sprint[]>> => {
    const response = await apiRequest<Sprint[]>("/sprint", "GET", token);
    return response
}

export const getSprintById = async (sprintId: string, token?: string): Promise<ApiResponse<Sprint>> => {
    const response = await apiRequest<Sprint>(`/sprint/${sprintId}`, "GET", token);
    return response
}

export const deleteSprintById = async (sprintId: string, token?: string): Promise<ApiResponse<boolean>> => {
    const response = await apiRequest<boolean>(`/sprint/${sprintId}`, "DELETE", token);
    return response
}

export const updateSprint = async (sprintId: string, sprint: BaseSprint, token?: string): Promise<ApiResponse<Sprint>> => {
    const updatedSprint = structuredClone(sprint)
    if (sprint.intervals && sprint.takeBreak) {
        if (sprint.intervals.length > 0) {
            let totalD = 0
            let totalTime = 0
            let totalLaps = 0
            for (const interval of sprint.intervals) {
                totalD = totalD + interval.distance
                totalTime = totalTime + interval.time
                if (interval.numberOfLaps) totalLaps = totalLaps + interval.numberOfLaps
            }
            updatedSprint.distance = totalD
            updatedSprint.time = totalTime
            if (totalLaps) updatedSprint.numberOfLaps = totalLaps
        }
    }
    const response = await apiRequest<Sprint>(`/sprint/${sprintId}`, 'PATCH', token, updatedSprint)
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

    const fechaInicio = new Date(Math.min(...fechas.map(f => f.getTime())));
    const fechaFin = new Date(Math.max(...fechas.map(f => f.getTime())));

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

    if (filter.distanceRange != undefined) {
        if (filter.distanceRange.min || filter.distanceRange.max) {
            const min = filter.distanceRange.min ?? 0
            const max = filter.distanceRange.max ?? Infinity
            filteredSprints = filteredSprints.filter(sprint => (sprint.distance > min && sprint.distance < max))
        }
    }

    if (filter.effortRange != undefined) {
        if (filter.effortRange.min || filter.effortRange.max) {
            const min = filter.effortRange.min ?? 0
            const max = filter.effortRange.max ?? 100
            filteredSprints = filteredSprints.filter(sprint => {
                if (!sprint.effort) return
                if (sprint.effort > min && sprint.effort < max) {
                    return sprint
                }
            })
        }

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