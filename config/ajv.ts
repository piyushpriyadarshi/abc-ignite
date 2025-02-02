import Ajv from "ajv";
import addFormats from "ajv-formats";

/**
 * Creates and returns a configured AJV instance.
 */
export const createCustomAjv = (): Ajv => {
    const ajv = new Ajv({
        allErrors: true, // Show all validation errors
        removeAdditional: true, // Remove additional properties not in the schema
    });

    // Add built-in formats like "date", "email", etc.
    addFormats(ajv);

    // Add a custom format for future dates
    ajv.addFormat("future-date", {
        type: "string",
        validate: (dateString: string) => {
            const today = new Date();
            const date = new Date(dateString);
            return date > today; // Validate that the date is in the future
        },
    });
    ajv.addFormat("hh:mm", {
        type: "string",
        validate: (timeString: string) => {
            const regex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Matches HH:MM (24-hour format)
            return regex.test(timeString);
        },
    });
    return ajv;
};
