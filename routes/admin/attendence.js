const express = require('express')
const router = express.Router()
const auth = require("../../middlewares/isAuth");
const authEmployee = require("../../middlewares/authEmployee");

const {getAllAttendence, getAllAttendenceById, addAttendence} = require('../../controllers/attendence')

router.get("/", authEmployee, getAllAttendence);
router.get('/:id', auth, getAllAttendenceById)
router.post('/', auth, addAttendence)


module.exports = router