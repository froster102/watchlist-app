import dotenv from 'dotenv'
import Joi from 'joi'

dotenv.config()

const envValidationSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development').required(),
        PORT: Joi.number().default(3000),
        MONGO_URL: Joi.string().required().description('Mongo url to connect monogodb database'),
        JWT_SECRET: Joi.string().required().description('JWT token secret'),
        ACCESS_TOKEN_EXPIRY: Joi.number().required().description('Jwt access token expiry time in minutes'),
        REFRESH_TOKEN_EXPIRY: Joi.number().required().description('Jwt refresh token expiry time in days'),
        SMTP_SERVICE: Joi.string().required().description('Smtp service name to connect email server'),
        SMTP_EMAIL: Joi.string().required().description('Username for email server'),
        SMTP_PASS: Joi.string().required().description('Password for email server'),
        CLIENT_APP_ORIGIN: Joi.string().required().description('Client side app origin'),
        TMDB_ACCESS_TOKEN: Joi.string().required().description('Access token for tmdb service')
    })

const { value: envVars, error } = envValidationSchema.prefs({ errors: { label: 'key' } }).validate(process.env, { allowUnknown: true })

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const config = {
    server: {
        PORT: envVars.PORT,
        NODE_ENV: envVars.NODE_ENV
    },
    otp: {
        OTP_EXPIRATION_TIME: new Date(Date.now() + 5 * 60 * 1000)
    },
    jwt: {
        JWT_SECRET: envVars.JWT_SECRET,
        ACCESS_TOKEN_EXPIRY: envVars.ACCESS_TOKEN_EXPIRY,
        REFRESH_TOKEN_EXPIRY: envVars.REFRESH_TOKEN_EXPIRY,
    },
    database: {
        MONGO_URL: envVars.MONGO_URL,
    },
    email: {
        smtp: {
            service: envVars.SMTP_SERVICE,
            auth: {
                user: envVars.SMTP_EMAIL,
                pass: envVars.SMTP_PASS
            }
        },
    },
    client: {
        appOrigin: envVars.APP_ORIGIN
    },
    tmdb: {
        accessToken: envVars.TMDB_ACCESS_TOKEN
    }
}

export default config