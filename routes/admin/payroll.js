const express = require('express')
const router = express.Router()
const auth = require("../../middlewares/isAuth");
const authEmployee = require("../../middlewares/authEmployee");
const { isEmployee } = require("../../middlewares/isRoll");

const {getAllPayroll, getPayrollById, addPayroll} = require('../../controllers/payroll')

router.get("/",  authEmployee, getAllPayroll);
router.get('/:id', auth,  getPayrollById)
router.post('/', auth, addPayroll)

module.exports = router