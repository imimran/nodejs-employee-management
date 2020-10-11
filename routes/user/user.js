const express = require('express')
const router = express.Router()

const { getAllUser, getUser, addUser } = require("../../controllers/user");



router.get('/:id', getUser)
router.get('/', getAllUser)
router.post("/signup", addUser);





module.exports = router



