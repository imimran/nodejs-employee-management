const express = require("express");
const router = express.Router();
const auth = require('../middleware/isAuth')

const {
  getAllEmployee,
  addEmployee,
  editEmployee,
  getEmployeeById,
  deleteEmployee
} = require("../controllers/employee");

router.get("/", auth,  getAllEmployee);
router.get("/:id", getEmployeeById)
router.post("/", addEmployee);
router.put("/:id", editEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
