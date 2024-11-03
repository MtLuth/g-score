class AppError extends Error {
    statusCode;
    status;
    isOperational;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode.toString().startsWith("4") ? "fail" : "error";
        this.isOperational = true;
    }
}
export default AppError;
