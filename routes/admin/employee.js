const express = require("express");
const router = express.Router();
const auth = require('../../middlewares/isAuth')


const {
  getAllEmployee,
  addEmployee,
  editEmployee,
  getEmployeeById,
  deleteEmployee, upload
} = require("../../controllers/employee");

router.get("/", auth,  getAllEmployee);
router.get("/:id", auth, getEmployeeById)
router.post("/", auth, upload, addEmployee);

router.put("/:id", auth,  editEmployee);
router.delete("/:id", auth, deleteEmployee);

module.exports = router;
