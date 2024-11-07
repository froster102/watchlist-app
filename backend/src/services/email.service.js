import nodemailer from 'nodemailer'
import config from '../config/config.js'
import logger from '../config/logger.js'

const transport = nodemailer.createTransport(config.email.smtp)
transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server.Check smtp configuration in .env'))

/**
 * Send email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
export const sendEmail = async (to, subject, html) => {
    const msg = { from: config.email.from, to, subject, html }
    await transport.sendMail(msg)
}

/**
 * Send verification email
 * @param {string} to 
 * @param {string} token 
 * @returns {Promise}
 */
export const sendVerificationEmail = async (to, token) => {
    const subject = 'Verification Email'
    const verificationEmailUrl = `${config.client.appOrigin}/verify?token=${token}`
    const html = `<p> Dear user,\n To verify your email please click on the link <a href="${verificationEmailUrl}" target='_blank' rel='noopener noreferrer'>verify</a>,\n
    If you did not create an account, then ignore this email </p>`
    await sendEmail(to, subject, html)
}
