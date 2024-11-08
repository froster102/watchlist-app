import dotenv from 'dotenv'

dotenv.config()

const config = {
    server: {
        PORT: process.env.PORT,
        NODE_ENV: process.env.NODE_ENV
    },
    otp: {
        OTP_EXPIRATION_TIME: new Date(Date.now() + 5 * 60 * 1000)
    },
    jwt: {
        JWT_SECRET: process.env.JWT_SECRET,
        ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
        REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
    },
    database: {
        MONGO_URI: process.env.MONGO_URI,
    },
    email: {
        smtp: {
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASS
            }
        },
    },
    client: {
        appOrigin: process.env.APP_ORIGIN
    },
    tmdb : {
        accessToken : process.env.TMDB_ACCESS_TOKEN
    }
}

export default config