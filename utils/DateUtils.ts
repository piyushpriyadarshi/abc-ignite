import { OccurrenceType } from "../models/Class";

export const generateDatesBetween = (startDate: Date, endDate: Date, occurrence: OccurrenceType): Date[] => {
    const dates = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
        dates.push(currentDate);
        switch (occurrence) {
            case OccurrenceType.DAILY:
                currentDate = addDays(currentDate, 1);
                break;
            case OccurrenceType.WEEKLY:
                currentDate = addDays(currentDate, 7);
                break;
            case OccurrenceType.ALTERNATE_DAYS:
                currentDate = addDays(currentDate, 2);
                break;
            case OccurrenceType.WEEKDAYS:
                currentDate = addDays(currentDate, 1);
                while (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
                    currentDate = addDays(currentDate, 1);
                }
                break;
        }
    }
    return dates;
}

function addDays(currentDate: Date, days: number): Date {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

