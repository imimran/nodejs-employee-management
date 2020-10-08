const express = require("express");
const router = express.Router();

const {
  getAllCost, getCostById, addCost
} = require("../controllers/costManage");

router.get("/", getAllCost);
router.get("/:id", getCostById);
router.post("/", addCost);

module.exports = router;