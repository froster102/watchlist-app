import mongoose from "mongoose"
import ApiError from "../utils/ApiError.js"
import httpStatus from 'http-status'
import config from "../config/config.js"
import logger from "../config/logger.js"

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorConvertor = (err, req, res, next) => {
    let error = err
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR
        const message = error.message || httpStatus[statusCode]
        error = new ApiError(statusCode, message, err.stack)
    }
    next(error)
}

const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err
    if (config.server.NODE_ENV === 'production') {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
    }
    const response = {
        code: statusCode,
        message,
        ...(config.server.NODE_ENV === 'development' && { stack: err.stack })
    }

    if (config.server.NODE_ENV === 'development') {
        logger.error(err)
    }

    return res.status(statusCode).json(response)
}

export {
    notFound,
    errorConvertor,
    errorHandler
}