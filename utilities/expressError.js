class expressError extends Error { //custom error class
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode
    }
}

module.exports = expressError