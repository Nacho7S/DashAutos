const UserController = require('../controllers/ControllerUser')

const user = require('express').Router()

user.post('/register', UserController.Register)

user.post('/login', UserController.login)

user.post('/glogin', UserController.handleLogin)

user.put('/', UserController.Edit)

module.exports = user