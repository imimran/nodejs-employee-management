const express = require("express");
const router = express.Router();

const {
  getAllAnnouncement,
  getAllAnnouncementById,
  addAnnouncement,
} = require("../controllers/announcement");

router.get("/", getAllAnnouncement);
router.get("/:id", getAllAnnouncementById);
router.post("/", addAnnouncement);

module.exports = router;
