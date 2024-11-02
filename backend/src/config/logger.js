import pkg from 'winston'
import winston from 'winston'
import config from './config.js'

const { level } = pkg

const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack })
    }
    return info
})

const logger = winston.createLogger({
    level: config.server.NODE_ENV === 'development' ? 'debug' : 'info',
    format: winston.format.combine(
        enumerateErrorFormat(),
        config.server.NODE_ENV === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf(({ level, message }) => `${level}:${message}`)
    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ['error'],
        })
    ]
})

export default logger