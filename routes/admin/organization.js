const express = require("express");
const router = express.Router();
const auth = require('../../middleware/isAuth')
const {getAllOrganization, getOrganizationById, addOrganization} = require('../../controllers/organization')

router.get('/', auth,  getAllOrganization)
router.get("/:id", auth, getOrganizationById);
router.post('/', auth, addOrganization)

module.exports = router