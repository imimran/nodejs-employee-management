const express = require('express')
const router = express.Router()

const {getAllPayroll, getPayrollById, addPayroll} = require('../controllers/payroll')

router.get('/', getAllPayroll)
router.get('/:id', getPayrollById)
router.post('/', addPayroll)

module.exports = router