import nodemailer from 'nodemailer'
import config from '../config/config.js'
import logger from '../config/logger.js'

// const transport = nodemailer.createTransport(config.email.smtp)
// transport
//     .verify()
//     .then(() => logger.info('Connecting to email server'))
//     .catch(() => logger.warn('Unable to connect to email server.Check smtp configuration in .env'))

/**
 * Send otp
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
export const sendEmail = async (to, subject, text) => {
    const msg = { from: config.email.from, to, subject, text }
    await transport.sendMail(msg)
}

/**
 * 
 * @param {string} to 
 * @param {number} otp 
 * @returns {Promise}
 */
export const senOtp = async (to, otp) => {
    const subject = 'Verification otp'
    const text = `Dear user,\n To verify your email please enter this otp is ${otp},\n
    If you did not create an account, then ignore this email`
    await sendEmail(to, otp)
}
