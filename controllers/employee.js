const Employee = require("../models/employee");
const Organization = require("../models/organization");
const { success, fail, validation } = require("../utils/helper");
const { authUser } = require("../utils/auth");
const path = require("path");
const multer = require("multer");
//const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

exports.getAllEmployee = async (req, res) => {
  try {
    const token = req.header("auth-token");
    auth_user = await authUser(token);

    const employees = await Employee.findAll({
      where: { "$organization.userId$": auth_user.id },
      include: [
        {
          model: Organization,
        },
      ],
    });
    res.status(200).json(success("OK", { data: employees }, res.statusCode));
  } catch (error) {
    res.status(501).json(fail(error, res.statusCode));
    return;
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    if (!req.params.id) {
      throw "No Match ID";
    }

    const employee = await Employee.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Organization,
        },
      ],
    });
    res.status(200).json(success("OK", { data: employee }, res.statusCode));
    return;
  } catch (error) {
    console.log(error);
    res.status(501).json(fail(error, res.statusCode));
    return;
  }
};

(module.exports.upload = upload.single("image")),
  async (req, res, next) => {
    const image = req.file.path;
    console.log(image);
    next();
  };

exports.addEmployee = async (req, res, next) => {
  //console.log("data: ", req.file, req.body);
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const salary = req.body.salary;
    const designation = req.body.designation;
    const department = req.body.department;
    const organizationId = req.body.organizationId;
    const image = req.file.filename;

    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !salary ||
      !designation ||
      !department ||
      !organizationId ||
      !image
    ) {
      return res.status(422).json(validation("Please input all field"));
    }

    let preEmployee = await Employee.findOne({
      where: { email: req.body.email },
    });
    if (preEmployee)
      return res.status(400).json(validation("Employee already registered."));

    let organization = await Organization.findByPk(organizationId);
    if (!organization)
      return res
        .status(400)
        .json(validation("No registered Organization Found."));

    const employee = await Employee.create({
      name: name,
      email: email,
      phone: phone,
      address: address,
      salary: salary,
      designation: designation,
      department: department,
      organizationId: organizationId,
      image: image,
    });
    res.status(200).json(success("OK", { data: employee }, res.statusCode));
  } catch (error) {
    console.log(error);
    res.status(501).json(fail(error, res.statusCode));
    return;
  }
  next();
};

exports.editEmployee = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const salary = req.body.salary;
    const designation = req.body.designation;
    const department = req.body.department;
    const organizationId = req.body.organizationId;
    //const image = req.file.filename;

    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !salary ||
      !designation ||
      !department ||
      !organizationId 
 
    ) {
      return res.status(422).json(validation("Please input all field"));
    }

    let organization = await Organization.findByPk(organizationId);
    if (!organization)
      return res
        .status(400)
        .json(validation("No registered Organization Found.", res.statusCode));
    const editEmployee = await Employee.update(
      {
        name: req.body.name,
        email: req.body.email,
        phone: phone,
        address: address,
        salary: salary,
        designation: req.body.designation,
        department: req.body.department,
        organizationId: req.body.organizationId,
        //image: req.file.filename,
      },
      {
        where: { id: req.params.id },
      }
    );
    res
      .status(200)

      .json(success("Edit Successfully", { data: "success" }, res.statusCode));
  } catch (error) {
    console.log(error);
    res.status(501).json(fail(error, res.statusCode));
    return;
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const removeEmployee = await Employee.destroy({
      where: {
        id: req.params.id,
      },
    });
    res
      .status(200)
      .json(success("Remove Employee", { data: "Success" }, res.statusCode));

    return;
  } catch (error) {
    console.log(error);
    res.status(501).json(fail(error, res.statusCode));
    return;
  }
};
