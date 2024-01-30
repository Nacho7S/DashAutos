const VehicleController = require('../controllers/ControllerVehicle')
const authentication = require('../middleware/authentication')
const { verifiedUserOnly, archivedUserById } = require('../middleware/authorization')
const vehicle = require('express').Router()


vehicle.get('/', VehicleController.showAllVehicle)
vehicle.get('/:vehicleId', VehicleController.detailVehicle)
vehicle.use(authentication)
vehicle.post('/verify-vin', VehicleController.verifyVin)
vehicle.post('/', verifiedUserOnly, VehicleController.addVehicle)
vehicle.put('/:vehicleId',VehicleController.changeVehicleEdit)

module.exports = vehicle