import { Sprint } from "./Sprint";

export interface StatProps {
    fetchedSprints: Sprint[],
    loading: boolean
}
export interface Distance {
    id: number,
    distance: number,
    description: string
}

export interface IPersonalRecord {
    id: number,
    distance: Distance,
    sprint: Sprint
}