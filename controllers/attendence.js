const Attendence = require('../models/attendence')

exports.getAllAttendence = async(req, res) =>{
    const attendence = await Attendence.findAll()
    res.send(attendence)
}

exports.getAllAttendenceById = async(req, res) =>{
    const attendence = await Attendence.findByPk(req.params.id);
    res.send(attendence);
}

exports.addAttendence = async(req, res) =>{
    const month = req.body.month
    const leaves = req.body.leaves
    const employeeId = req.body.employeeId

    const attendence = await Attendence.create({
        month: month,
        leaves: leaves,
        employeeId: employeeId
    })
    res.send(attendence)
}