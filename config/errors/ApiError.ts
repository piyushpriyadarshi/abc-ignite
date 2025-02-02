export default class ApiError extends Error {
    public statusCode: number;
    public isOperational: boolean;

    constructor(message: string, statusCode: number, isOperational: boolean = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        // Set the prototype explicitly to maintain the instance of ApiError
        Object.setPrototypeOf(this, new.target.prototype);

        // Capture the stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}