const express = require("express");
const router = express.Router();

const {
 getAllLeaveRequest, getAllLeaveRequestById, addLeaveRequest
} = require("../controllers/leaveRequest");

router.get("/", getAllLeaveRequest);
router.get("/:id", getAllLeaveRequestById);
router.post("/", addLeaveRequest);

module.exports = router;
