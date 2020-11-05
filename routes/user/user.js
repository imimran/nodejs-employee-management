const express = require('express')
const router = express.Router()
const auth = require("../../middlewares/isAuth");
const {isAdmin} = require('../../middlewares/isRoll')
const { getAllUser, getUser, addUser } = require("../../controllers/user");



router.get("/:id", [auth, isAdmin], getUser);
router.get("/", [auth, isAdmin], getAllUser);
router.post("/signup", addUser);





module.exports = router



