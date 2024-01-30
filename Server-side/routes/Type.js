const TypeController = require('../controllers/ControllerType')

const type = require('express').Router()

type.get('/', TypeController.showAllTypes)

module.exports = type