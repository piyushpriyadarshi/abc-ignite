// import Ajv from "ajv";
// import addFormats from "ajv-formats";

import { format } from "path";

// const ajv = new Ajv();
// addFormats(ajv); // Add built-in formats like "date"

// // Add a custom format for future dates
// ajv.addFormat("future-date", {
//     type: "string",
//     validate: (dateString: string) => {
//         const today = new Date();
//         const date = new Date(dateString);
//         return date > today; // Validate that the date is in the future
//     },
// });

export const ClassSchema = {
    create: {
        body: {
            type: 'object',
            required: ['name', 'startDate', 'endDate', 'startTime', 'duration', 'capacity', 'occurrence'],
            properties: {
                name: { type: 'string' },
                startDate: { type: 'string', format: 'date' },
                endDate: { type: 'string', format: 'future-date' },
                startTime: { type: 'string', format: 'hh:mm' },
                duration: { type: 'number' },
                capacity: { type: 'number', minimum: 1 },
                occurrence: {
                    type: 'string',
                    enum: ['daily', 'weekly', 'alternate_days', 'weekdays'],
                },
            },
        },
    }
}