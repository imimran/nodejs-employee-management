const express = require('express')
const router = express.Router()
const auth = require("../../middlewares/isAuth");
const { getAllUser, getUser, addUser } = require("../../controllers/user");



router.get('/:id', getUser)
router.get('/', auth, getAllUser)
router.post("/signup", addUser);





module.exports = router



