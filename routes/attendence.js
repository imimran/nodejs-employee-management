const express = require('express')
const router = express.Router()

const {getAllAttendence, getAllAttendenceById, addAttendence} = require('../controllers/attendence')

router.get('/', getAllAttendence)
router.get('/:id', getAllAttendenceById)
router.post('/', addAttendence)


module.exports = router