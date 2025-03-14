export interface BaseSprint {
    distance: number, // distance in meters
    time: number,  // time in seconds
    date: Date,
    circuit?: Circuit,
    numberOfLaps?: number,
    temperature?: number,
    comment?: string,
    takeBreak: boolean,
    effort?: number
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

export interface Filter {
    dateRange?: any,
    distanceRange?: DoubleRange
    takeBreak?: boolean
}