export default class ConflictException extends Error {
    message: string;  
    statusCode: number;
    
    constructor(message: string) {
        super(message);
        this.statusCode = 409;
        this.message = message;
    }
}