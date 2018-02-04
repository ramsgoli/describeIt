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

class Forbidden extends HttpError {
    constructor(message) {
        super(403, message || "Forbidden");
    }
}

class NotFound extends HttpError {
    constructor(message) {
        super(404, message || "Not Found");
    }
}

class InternalError extends HttpError {
    constructor(message) {
        super(500, message || "Internal Error");
    }
}

const errorHandler = (err, req, res, next) => {
    return res.status(err.status).json({
        message: err.message
    });
}

module.exports = {
    BadRequest, Forbidden, InternalError, NotFound, errorHandler
}
