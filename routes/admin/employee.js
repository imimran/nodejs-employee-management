const express = require("express");
const router = express.Router();
const auth = require('../../middleware/isAuth')

const {
  getAllEmployee,
  addEmployee,
  editEmployee,
  getEmployeeById,
  deleteEmployee
} = require("../../controllers/employee");

router.get("/", auth,  getAllEmployee);
router.get("/:id", auth, getEmployeeById)
router.post("/", auth, addEmployee);
router.put("/:id", auth,  editEmployee);
router.delete("/:id", auth, deleteEmployee);

module.exports = router;
