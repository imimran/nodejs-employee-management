const express = require("express");
const router = express.Router();
const auth = require('../../middleware/isAuth')
const {getAllOrganization, addOrganization} = require('../../controllers/organization')

router.get('/', auth,  getAllOrganization)
router.post('/', auth, addOrganization)

module.exports = router