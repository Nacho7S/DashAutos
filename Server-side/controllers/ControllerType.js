const {Type} = require('../models')
class TypeController{
  static async showAllTypes(req, res, next) {
    try {
      const types = await Type.findAll()
      console.log(types);
      res.status(200).json(types)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = TypeController