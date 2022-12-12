class ErrorHandler{
    constructor(status, msg){
        this.msg = msg;
        this.status= status;
    }

    static validationError(message='All Fields are Required'){
        return new ErrorHandler(422,message);
    }

    static notFoundError(message='Not Found'){
        return new ErrorHandler(404,message);
    }

    static serverError(message='Internal server Error'){
        return new ErrorHandler(500,message);
    }
}

module.exports = ErrorHandler;