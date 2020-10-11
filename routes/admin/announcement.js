const express = require("express");
const router = express.Router();
const auth = require("../../middleware/isAuth");

const {
  getAllAnnouncement,
  getAllAnnouncementById,
  addAnnouncement,
} = require("../../controllers/announcement");

router.get("/", auth, getAllAnnouncement);
router.get("/:id", auth, getAllAnnouncementById);
router.post("/", auth, addAnnouncement);

module.exports = router;
