const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/isAuth");

const {
 getAllLeaveRequest, getAllLeaveRequestById, addLeaveRequest
} = require("../../controllers/leaveRequest");

router.get("/", auth, getAllLeaveRequest);
router.get("/:id", auth, getAllLeaveRequestById);
router.post("/", auth, addLeaveRequest);

module.exports = router;
