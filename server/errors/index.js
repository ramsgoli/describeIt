class HttpError extends Error {
    constructor(status, message) {
        super(message);
        
        this.status = status;
    }
}

class BadRequest extends HttpError {
    constructor(message) {
        super(400, message || "Bad Request");
    }
}

const errorHandler = (err, req, res, next) => {
    return res.status(err.status).json({
        message: err.message
    });
}

module.exports = {
    BadRequest, errorHandler
}
