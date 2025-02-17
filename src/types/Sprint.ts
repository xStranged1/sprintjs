export interface BaseSprint {
    distance: number; // distance in meters
    time: number;     // time in seconds
    date: Date;
}

export interface Sprint extends BaseSprint {
    id: number;
    createDate: string;  // createDate as string (ISO format)
    updateDate: string;  // updateDate as string (ISO format)
    pace: number;
}