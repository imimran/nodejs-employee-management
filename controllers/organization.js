const Organization = require('../models/organization')
const User = require('../models/user')
const { success, fail, validation } = require("../utils/helper");

exports.getAllOrganization = async(req, res) =>{

  try {
    const organization = await Organization.findAll()
    res.status(200).json(success("OK", { data: organization }, res.statusCode));
 
    return;
  } catch (error) {
    console.log(error);
  }
  res.status(501).json(fail(error, res.statusCode));
  return;
    
}

exports.getOrganizationById = async (req, res) => {
  try {
    let user = await User.findByPk(req.params.id);
     if (req.body.id !== user)
         return res
           .status(400)
           .json(validation("User Not Match.", res.statusCode));

    const organization = await Organization.findByPk(req.params.id);
    res.status(200).json(success("OK", { data: organization }, res.statusCode));

    return;
  } catch (error) {
    console.log(error);
  }
  res.status(501).json(fail(error, res.statusCode));
  return;
};

exports.addOrganization = async(req, res) => {

  try {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const userId = req.body.userId

    if (!name || !email || !phone || !address || !userId) {
      return res.status(422).json(validation("Please input all field",  res.statusCode));
    }

    let preOrganization = await Organization.findOne({ where: { email: req.body.email }});
    if (preOrganization) return res.status(400).json(validation( "Organization already registered.", res.statusCode));

    let user = await User.findByPk(userId);
    if (!user) return res.status(400).json(validation("No registered User Found.", res.statusCode));
  
  
    const organization = await Organization.create({
      name: name,
      email: email,
      phone: phone,
      address: address,
      userId: userId
    });
    res.status(200).json(success("OK", { data: organization }, res.statusCode));
  } catch (error) {
    
    console.log(error);
  }
  res.status(501).json(fail(error, res.statusCode));
  return;

}
