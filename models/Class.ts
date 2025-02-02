
export class Class {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    startTime: string;
    duration: number; // in minutes
    capacity: number;
    occurrence: OccurrenceType;

    constructor(
        { id,
            name,
            startDate,
            endDate,
            startTime,
            duration,
            capacity,
            occurrence }:
            {
                id: string,
                name: string,
                startDate: Date,
                endDate: Date,
                startTime: string,
                duration: number,
                capacity: number,
                occurrence: OccurrenceType
            }
    ) {
        this.id = id;
        this.name = name;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.startTime = startTime;
        this.duration = duration;
        this.capacity = capacity;
        this.occurrence = occurrence;
    }
}

export enum OccurrenceType {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    ALTERNATE_DAYS = 'alternate_days',
    WEEKDAYS = 'weekdays',
}