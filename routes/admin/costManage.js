const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/isAuth");

const {
  getAllCost, getCostById, addCost
} = require("../../controllers/costManage");

router.get("/", auth, getAllCost);
router.get("/:id", auth, getCostById);
router.post("/", auth, addCost);

module.exports = router;