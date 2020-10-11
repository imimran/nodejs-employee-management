const express = require('express')
const router = express.Router()
const auth = require("../../middleware/isAuth");

const {getAllAttendence, getAllAttendenceById, addAttendence} = require('../../controllers/attendence')

router.get('/', auth, getAllAttendence)
router.get('/:id', auth, getAllAttendenceById)
router.post('/', auth, addAttendence)


module.exports = router