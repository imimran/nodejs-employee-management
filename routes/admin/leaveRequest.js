const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/isAuth");
const authEmployee = require("../../middlewares/authEmployee");
const {isEmployee} = require('../../middlewares/isRoll')
const {
 getAllLeaveRequest, getAllLeaveRequestById, addLeaveRequest
} = require("../../controllers/leaveRequest");

router.get("/", [authEmployee], getAllLeaveRequest);
router.get("/:id", [auth], getAllLeaveRequestById);
router.post("/", [authEmployee], addLeaveRequest);

module.exports = router;
