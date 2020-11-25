const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/isAuth");
const authEmployee = require("../../middlewares/authEmployee");

const {
  getAllAnnouncement,
  getAllAnnouncementById,
  addAnnouncement,
} = require("../../controllers/announcement");

router.get("/", authEmployee, getAllAnnouncement);
router.get("/:id", auth, getAllAnnouncementById);
router.post("/", auth, addAnnouncement);

module.exports = router;
