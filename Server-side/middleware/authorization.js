const {Vehicle} = require('../models')
const verifiedUserOnly = (req, res, next) => {
  console.log(req.user);
  if (req.user.statusVerify === "Verified"){
    next()
  } else {
    next({name: "Forbidden"})
  } 
}

const archivedUserById = (req, res, next) => {
  const { vehicleId } = req.params
  const vehicle = Vehicle.findByPk(vehicleId)
  if (req.user.statusVerify === "Verified" && req.user.id === vehicle.UserId){
    next()
  } else {
    next({name: "Forbidden"})
  } 
}

module.exports = { verifiedUserOnly, archivedUserById }