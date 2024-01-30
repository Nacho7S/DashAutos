const authentication = require('../middleware/authentication');
const type = require('./Type');
const sms = require('./smsOtp');
const user = require('./user');
const vehicle = require('./vehicles');
const router = require('express').Router()

// router.use(user)

router.use('/user', user)

router.use('/sms-otp', sms)

router.use('/vehicle', vehicle)

router.use('/type', type)

// router.use(authentication)


module.exports = router