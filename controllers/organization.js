const Organization = require("../models/organization");
const User = require("../models/user");
const { success, fail, validation } = require("../utils/helper");
const { authUser } = require("../utils/auth");
const jwt = require("jsonwebtoken");
const { jwtKey } = require("../utils/key");

exports.getAllOrganization = async (req, res) => {
  try {
    const token = req.header("auth-token");
    auth_user = await authUser(token);

    let organizations;

    if (auth_user.isAdmin == 1) {
      organizations = await Organization.findAll();
    } else {
      organizations = await Organization.findAll({
        where: { userId: auth_user.id },
      });
    }

    res
      .status(200)
      .json(success("OK", { data: organizations }, res.statusCode));
    return;
  } catch (error) {
    console.log(error);
    res.status(501).json(fail(error, res.statusCode));
    return;
  }
};

// exports.getAllOrganizationByUser = async (req, res) => {
//   try {

//      let user = await User.findByPk(decoded.id);
//      if (!user)
//        return res
//          .status(400)
//          .json(validation("User not match.", res.statusCode));
//     const organizations = await Organization.findOne({
//       where: { id: user.id },
//     });
//     res
//       .status(200)
//       .json(success("OK", { data: organizations }, res.statusCode));
//     return;
//   } catch (error) {
//     console.log(error);
//     res.status(501).json(fail(error, res.statusCode));
//     return;
//   }
// }

exports.getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findByPk(req.params.id);
    res.status(200).json(success("OK", { data: organization }, res.statusCode));

    return;
  } catch (error) {
    console.log(error);
    res.status(501).json(fail(error, res.statusCode));
    return;
  }
};

exports.addOrganization = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const userId = req.body.userId;

    if (!name || !email || !phone || !address) {
      return res.status(422).json(validation("Please input all field"));
    }

    let preOrganization = await Organization.findOne({
      where: { email: req.body.email },
    });
    if (preOrganization)
      return res
        .status(501)
        .json(validation("Organization already registered."));

    // let user = await User.findByPk(userId);
    // if (!user) return res.status(400).json(validation("No registered User Found."));
    const token = req.header("auth-token");
    auth_user = await authUser(token);

    const organization = await Organization.create({
      name: name,
      email: email,
      phone: phone,
      address: address,
      userId: auth_user.id,
    });
    const orgtoken = jwt.sign(
      { id: organization.id },
      jwtKey,
      {
        expiresIn: 3600,
      }
    );
    res
      .status(200)
      .json(
        success("OK", { data: organization, token: orgtoken }, res.statusCode)
      );
  } catch (error) {
    console.log(error);
    res.status(501).json(fail(error, res.statusCode));
    return;
  }
};
