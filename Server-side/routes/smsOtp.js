const { sendOTP, verifyOTP } = require('../controllers/twilio-sms')

const sms = require('express').Router()

sms.post('/send-otp', sendOTP)
sms.post('/verify-otp', verifyOTP)

module.exports = sms