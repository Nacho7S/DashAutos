const { verifyToken } = require("../helper/jwt");
const { User } = require("../models");

const authentication = async function (req, res, next) {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "UNAUTHENTICATED" };
    }

    const decoded = verifyToken(access_token);

    const findUser = await User.findOne({
      where: {
        id: decoded.id,
        email: decoded.email,
      },
    });
    // console.log(findUser);

    if (!findUser) {
      throw { name: "UNAUTHENTICATED" };
    }

    req.user = {
      id: findUser.id,
      email: findUser.email,
      statusVerify: findUser.statusVerify
    };

    next();
  } catch (error) {
    next(error);
    console.log(error);
    res.status(401).json(error)
  }
};

module.exports = authentication;