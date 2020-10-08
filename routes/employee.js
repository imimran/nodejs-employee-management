const express = require("express");
const router = express.Router();

const {
  getAllEmployee,
  addEmployee,
  editEmployee,
  getEmployeeById,
  deleteEmployee
} = require("../controllers/employee");

router.get("/",  getAllEmployee);
router.get("/:id", getEmployeeById)
router.post("/", addEmployee);
router.put("/:id", editEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
