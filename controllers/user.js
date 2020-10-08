const User = require('../models/user')

exports.getAllUser = async(req, res) =>{
    const users = await User.findAll()
    res.send(users)
}

exports.getUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.send(user);
};


exports.addUser =  async (req, res) => {

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.create({
    username: username,
    email: email,
    password: password,
  });
  res.send(user)
}