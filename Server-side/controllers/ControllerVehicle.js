const axios = require('axios');
const {User, Type, Vehicle} = require('../models')

class VehicleController {
  static async verifyVin(req, res, next) {
    const {vin} = req.body
    try {
       const { data } = await axios({
        method: 'GET',
        url: `https://api.api-ninjas.com/v1/vinlookup?vin=${vin}`,
        headers: {
          'X-Api-Key': process.env.APIKEY
        }
       })
      console.log(data);
      res.status(200).json({ message: "Successfully verified Vehicle VIN",data })
    } catch (err) {
      console.log(err);
      next(err)
    }
  }


  static async addVehicle(req, res, next) {
    const {
      vin, 
      brand, 
      imgUrl, 
      model, 
      transMission, 
      yearRelease, 
      milleage, 
      price, 
      TypeId, 
      features, 
      currentLocation, 
      condition
    } = req.body
    console.log(req.body);
    try {
      const addedVehicle = await Vehicle.create({
        vin,
        brand,
        imgUrl,
        model,
        transMission,
        UserId: req.user.id,
        yearRelease,
        milleage,
        price,
        TypeId,
        features,
        currentLocation,
        condition
      })
      console.log(addedVehicle);
      res.status(200).json(addedVehicle)

    } catch (err) {
      console.log(err);
      next(err)
      // res.status(404).json(error)
      // if (error.response) {
      //   console.error('Error:', error.response.status, error.response.data);
      // } else if (error.request) {
      //   console.error('Request failed:', error.request);
      // } else {
      //   console.error('Error:', error.message);
      // }
    }
  }

  static async showAllVehicle(req, res, next) {
    try {  
      const vehicleData = await Vehicle.findAll({
        include: [User, Type]
      })
      console.log(vehicleData);
      res.status(200).json(vehicleData)
    } catch (err) {
      console.log(err);
      next(err)
    
    }
  }

  static async changeVehicleEdit(req, res, next) {
    try {
      const {
        vin, 
        brand, 
        imgUrl, 
        model, 
        transMission, 
        yearRelease, 
        milleage, 
        price, 
        TypeId, 
        features, 
        currentLocation, 
        condition
      } = req.body
      // console.log(req.body);
      console.log(req.params);
      const { vehicleId } = req.body
      const selector = { where: { id: vehicleId } }
      const value = {vin, 
        brand, 
        imgUrl, 
        model, 
        transMission, 
        yearRelease, 
        milleage, 
        price, 
        TypeId, 
        features, 
        currentLocation, 
        condition}
      const vehicle = await Vehicle.update(selector, value)
      res.status(201).json(vehicle)
    } catch(err) {
      console.log(err);
      next(err)
    }
  }

  static async detailVehicle(req, res, next) {
    const {vehicleId} = req.params
    try {
      const vehicleDetail = await Vehicle.findOne({
        where: { id: vehicleId },
        include: [User, Type]
      })
      res.status(200).json(vehicleDetail)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = VehicleController