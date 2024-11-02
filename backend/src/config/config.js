import dotenv from 'dotenv'

dotenv.config()

const config = {
    server: {
        PORT: process.env.PORT,
        NODE_ENV: process.env.NODE_ENV
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
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASS
            }
        },
        from: process.env.SMTP_EMAIL
    }
}

export default config