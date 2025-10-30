export default class BadRequestException extends Error {
    statusCode: number;
    message: string;
    details?: {};

    constructor(message: string, details?: {}) {
        console.log("BadRequestException details:", details);
        super(message);
        this.statusCode = 400;
        this.message = message;
        this.details = details;
    }
}