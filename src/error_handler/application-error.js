// Custom error handler class
export default class ApplicationError extends Error{
    // Constructor declaration
    constructor(message,code){
        super(message);
        this.code=code;
    }
}