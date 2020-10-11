const Employee = require("../models/employee");
const Organization = require("../models/organization");
const { success, fail, validation } = require("../utils/helper");

exports.getAllEmployee = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json(success("OK", { data: employees }, res.statusCode));
  } catch (error) {
    console.log(error);
  }
  res.status(501).json(fail(error, res.statusCode));
  return;
};

exports.getEmployeeById = async (req, res) => {
  try {
    if (!req.params.id) {
      throw "No Match ID";
    }

    const employee = await Employee.findByPk(req.params.id);
    res.status(200).json(success("OK", { data: employee }, res.statusCode));
    return;
  } catch (error) {
    console.log(error);
  }
  res.status(501).json(fail(error, res.statusCode));
  return;
};

exports.addEmployee = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const designation = req.body.designation;
    const department = req.body.department;
    const organizationId = req.body.organizationId;

    if (!name || !email || !designation || !department || !organizationId) {
      return res.status(422).json(validation("Please input all field", res.statusCode));
    }

    let preEmployee = await Employee.findOne({
      where: { email: req.body.email },
    });
    if (preEmployee)
      return res.status(400).json(validation("Employee already registered.", res.statusCode));

    let organization = await Organization.findByPk(organizationId);
    if (!organization)
      return res.status(400).json(validation( "No registered Organization Found.", res.statusCode));

    const employee = await Employee.create({
      name: name,
      email: email,
      designation: designation,
      department: department,
      organizationId: organizationId,
    });
    res.status(200).json(success("OK", { data: employee }, res.statusCode));
  } catch (error) {
    console.log(error);
  }
  res.status(501).json(fail(error, res.statusCode));
  return;
};

exports.editEmployee = async (req, res) => {
  try {
   
        const name = req.body.name;
        const email = req.body.email;
        const designation = req.body.designation;
        const department = req.body.department;
        const organizationId = req.body.organizationId;
        
    if (!name || !email || !designation || !department || !organizationId) {
      return res
        .status(422)
        .json(validation("Please input all field", res.statusCode));
    }

    // let preEmployee = await Employee.findOne({
    //   where: { email: req.body.email },
    // });
    // if (preEmployee)
    //   return res.status(400).json({ msg: "Employee already registered." });

    let organization = await Organization.findByPk(organizationId);
    if (!organization)
      return res
        .status(400)
        .json(validation("No registered Organization Found.", res.statusCode));
    const editEmployee = await Employee.update(
      {
        name: req.body.name,
        email: req.body.email,
        designation: req.body.designation,
        department: req.body.department,
        organizationId: req.body.organizationId,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.status(200).json(success("Edit Successfully", { data: editEmployee }, res.statusCode));
  } catch (error) {
    console.log(error);
  }
  res.status(501).json(fail(error, res.statusCode));
  return;
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
      .json(
        success("Remove Employee", { data: removeEmployee }, res.statusCode)
      );

    return;
  } catch (error) {
    console.log(error);
  }
  res.status(501).json(fail(error, res.statusCode));
  return;

  
};
