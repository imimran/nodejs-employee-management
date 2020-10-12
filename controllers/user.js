const User = require("../models/user");
const { success, fail, validation } = require("../utils/helper");
const bcrypt = require("bcrypt");
const { use } = require("../routes/user/user");

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(success("OK", { data: users }, res.statusCode));

    return;
  } catch (error) {
    console.log(error);
  }
  res.status(501).json(fail(error, res.statusCode));
  return;
};

exports.getUser = async (req, res) => {
  try {
    if (!req.params.id) {
      throw "No Match ID";
    }

    const user = await User.findByPk(req.params.id);
    res.status(200).json(success("OK", { data: user }, res.statusCode));
    //.send(user);
    return;
  } catch (error) {
    console.log(error);
  }
  res.status(501).json(fail(error, res.statusCode));
  return;
};

exports.addUser = async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!username || !email || !password) {
      return res
        .status(422)
        .json(validation("Please input all field", res.statusCode));
    }

    let preUser = await User.findOne({ where: { email: req.body.email } });
    if (preUser)
      return res
        .status(400)
        .json(validation("User already registered.", res.statusCode));

    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
     
    

    res.status(200).json(success("OK", { data: user }, res.statusCode));
  } catch (error) {
    console.log(error);
  }
  res.status(501).json(fail(error, res.statusCode));
  return;
};
