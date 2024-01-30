'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Vehicle)
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: "FirstName is Required"
        },
        notNull: {
          msg: "FirstName is Required"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: "LastName is Required"
        },
        notNull: {
          msg: "LastName is Required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: "Email has been Registered"
      },
      allowNull: false,
      validate:{
        notEmpty:{
          msg: "Email is Required"
        },
        notNull: {
          msg: "Email is Required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: "Password is Required"
        },
        notNull: {
          msg: "Password is Required"
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: "PhoneNumber is Required"
        },
        notNull: {
          msg: "PhoneNumber is Required"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: "Address is Required"
        },
        notNull: {
          msg: "Address is Required"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: "Role is Required"
        },
        notNull: {
          msg: "Role is Required"
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
    },
    statusVerify: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: "statusVerify is Required"
        },
        notNull: {
          msg: "statusVerify is Required"
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(instance, options) {
        if (instance.phoneNumber && instance.phoneNumber.startsWith('0')) {
          instance.phoneNumber = instance.phoneNumber.substr(1);
        }
      }
    },
    modelName: 'User',
  });
  return User;
};