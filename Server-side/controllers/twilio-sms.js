const {User} = require("../models")
const { TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env

const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  lazyLoading: true
})

const sendOTP = async (req, res, next) => {
  const { countryCode, phoneNumber } = req.body
  try {
    const otpResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: `+${countryCode}${phoneNumber}`,
        channel: "sms"
      })
      res.status(200).json({message: "OTP send successfully", otpResponse})
  } catch (err) {
    console.log(err);
    res.status(err?.status || 400).send(err?.message || 'something went wrong')
  }
}


const verifyOTP = async (req, res, next) => {
  const { countryCode, phoneNumber, otp } = req.body
  try {
    const verifiedResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `+${countryCode}${phoneNumber}`,
        code: otp,
      })
    res.status(200).json({ message: "OTP verified successfully", verifiedResponse })
    const value = {statusVerify: "Verified"}
    const  selector = {where: { phoneNumber: phoneNumber}}
    await User.update(value, selector)
  } catch (err) {
    console.log(err);
    res.status(err?.status || 400).send(err?.message || 'something went wrong')
  }
}

module.exports = {sendOTP, verifyOTP}