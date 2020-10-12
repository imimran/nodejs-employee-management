const express = require('express')
const router = express.Router()
const auth = require("../../middlewares/isAuth");

const {getAllPayroll, getPayrollById, addPayroll} = require('../../controllers/payroll')

router.get('/', auth, getAllPayroll)
router.get('/:id', auth,  getPayrollById)
router.post('/', auth, addPayroll)

module.exports = router