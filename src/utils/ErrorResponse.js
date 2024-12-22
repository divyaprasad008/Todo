class ErrorResponse extends Error{
    constructor(statusCode, message="Something went wrong", errors=[], errorStack = ""){
        super(message)

        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        if(errorStack){
            this.errorStack = errorStack
        }
        else{
            this.errorStack = Error.captureStackTrace;
        }
    }
}

export default ErrorResponse