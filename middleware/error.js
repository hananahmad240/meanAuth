const colors = require('colors');
const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = {
        ...err
    };

    error.message = err.message;

    if (err.name === 'CastError') {
        const message = `resource not find with id of ${err.value}`
        error = new ErrorResponse(message, 404);


    }

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((value) => {
            return value.message
        });
        error = new ErrorResponse(message, 404);

    }

    if (err.code === '11000') {
        const message = `Dublicate key or value enter`;
        error = new ErrorResponse(message, 404);

    }

    return res.status(400).json({
        success: false,
        error: error.message
    });
}

module.exports = errorHandler;