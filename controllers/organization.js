const Organization = require('../models/organization')
const User = require('../models/user')

exports.getAllOrganization = async(req, res) =>{
    const organization = await Organization.findAll()
    res.send(organization)
}

exports.addOrganization = async(req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const address = req.body.address;
  const userId = req.body.userId


  const organization = await Organization.create({
    name: name,
    email: email,
    phone: phone,
    address: address,
    userId: userId
  });
  res.send(organization)
}
