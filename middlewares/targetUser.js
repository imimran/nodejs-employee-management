const User = require("../models/user");
const {validation} = require('../utils/helper')

async function targetUser (req, res, next) {
  let user = await User.findByPk(req.body.userId);
  if (req.body.userId !== user)
    return res.status(400).json(validation("User not match.", res.statusCode));
    next();
}


module.exports = targetUser;
