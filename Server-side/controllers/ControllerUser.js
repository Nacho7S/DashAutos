const { OAuth2Client } = require('google-auth-library');
const { hashPassword, isPasswordTrue } = require('../helper/hashPassword');
const { signToken } = require('../helper/jwt');
const {User} = require('../models')

class UserController{
  static async Register (req, res, next) {
    const { firstName, lastName, email, password, phoneNumber, address} = req.body
    console.log(req.body)
    try {
      const data = await User.create({
        firstName,
        lastName,
        email,
        password: hashPassword(password),
        phoneNumber: phoneNumber,
        address: address,
        role: "customer",
        imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',
        statusVerify: "unVerified"
      })
  
      console.log(data);
      res.status(201).json(data)
    } catch (err) {
      console.log(err);
      next()
    }
  }

  static async login (req, res, next){
    try {
      const { email, password } = req.body
      if (!email) throw { name: "email can't be empty" }
      if (!password) throw { name: "Password can't be empty" }
      const user = await User.findOne({
        where: {
          email
        }
      })
      // console.log(user.password);
      if (!user) throw { name: "Invalid Login" }
      
      const validPassword = isPasswordTrue(password, user.password)
      
      if(!validPassword) throw {name: "Invalid Login"}
  
      const accessToken = signToken({
        id: user.id,
        email: user.email,
      })
  
      res.status(200).json({
        access_token: accessToken,
        user: user.firstName
      })
  
      // console.log(user);
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async Edit(req, res, next) {
    const { firstname, lastname, phoneNumber, address, imgUrl } = req.body
    try {
      const data = await User.update({
        firstName: firstname,
        lastName: lastname,
        phoneNumber: phoneNumber,
        address: address,
        imgUrl: imgUrl,
        where: {
          email: req.user.email
        }
      })
  
      console.log(data);
      res.status(201).json(data)
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "server internal error" })
    }
  }

  static async handleLogin(req, res, next) {
    // console.log(req.headers.google_token);
    try {
      const token = req.headers.google_token
      
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,  
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
      
      console.log(payload);

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          firstName: payload.given_name,
          lastName: payload.family_name,
          email: payload.email,
          password: "logged-by-google",
          address: "logged-bt-google",
          phoneNumber: "081203201",
          role: 'Customer',
          statusVerify: "Verified"
        },
        hooks: false
      })

      const accessToken = signToken({
        id: user.id,
        email: user.email
      })
      
      // res.status(200).json({ message: "logged with google success" })
      res.status(200).json({ access_token: accessToken, user })
    } catch (err) {
      next(err)
      console.log(err);
    
    }
  }
}

module.exports = UserController