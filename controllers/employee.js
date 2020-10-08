const Employee = require("../models/employee");

exports.getAllEmployee = async (req, res) => {
  const employees = await Employee.findAll();
  res.send(employees);
};

exports.getEmployeeById = async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  res.send(employee);
};

exports.addEmployee = async (req, res) => {
  const name = req.body.name;
  const designation = req.body.designation;
  const department = req.body.department;
  const organizationId = req.body.organizationId;

  const employee = await Employee.create({
    name: name,
    designation: designation,
    department: department,
    organizationId: organizationId,
  });
  res.send(employee);
};

exports.editEmployee = async (req, res) => {
  const editEmployee = await Employee.update(
    {
      name: req.body.name,
      designation: req.body.designation,
      department: req.body.department,
      organizationId: req.body.organizationId,
    },
    {
      where: { id: req.params.id },
    }
  );
  res.json({ msg: "Employee Edit Successfully" });
};

exports.deleteEmployee = async (req, res) => {
  const removeEmployee = await Employee.destroy({
    where: {
      id: req.params.id, 
    }
  });
  res.json({ msg: "Employee Remove Successfully" });
};
