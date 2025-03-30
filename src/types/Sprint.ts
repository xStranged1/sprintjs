export interface BaseSprint {
    distance: number, // distance in meters
    time: number,  // time in seconds
    date: Date,
    circuit?: Circuit,
    numberOfLaps?: number,
    temperature?: number,
    comment?: string,
    takeBreak: boolean,
    effort?: number,
    intervals?: BaseInterval[]
}

export interface Sprint extends BaseSprint {
    id: number,
    createDate: string,
    updateDate: string,
    pace: number,
}

export interface Circuit {
    name: string,
    distance: number
}

export type OrderedBy = 'date' | 'time' | 'pace' | 'circuit'

export const initialFilter: Filter = {
    distanceRange: undefined,
    effortRange: undefined,
    takeBreak: undefined,
    dateRange: undefined
}

export interface Filter {
    dateRange?: any,
    distanceRange?: DoubleRange
    takeBreak?: boolean,
    effortRange?: DoubleRange
}

export interface BaseInterval {
    distance: number,
    time: number,
    startWithRest?: boolean
    timeRest: number
    pace?: number
    numberOfRep: number
    order: number
    effort?: number
}
export const initialBaseInterval: BaseInterval = {
    distance: 0,
    numberOfRep: 0,
    order: 0,
    time: 0,
    timeRest: 0,
}