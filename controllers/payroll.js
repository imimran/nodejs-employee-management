const Payroll = require('../models/payroll')

exports.getAllPayroll = async(req, res)=>{
    const payroll = await Payroll.findAll()
    res.send(payroll)
}

exports.getPayrollById = async (req, res) => {
  const payroll = await Payroll.findByPk(req.params.id);
  res.send(payroll);
};

exports.addPayroll = async( req, res) =>{
    const salary = req.body.salary
    const employeeId = req.body.employeeId

    const payroll = await Payroll.create({
        salary: salary,
        employeeId: employeeId
    })
    res.send(payroll)

}