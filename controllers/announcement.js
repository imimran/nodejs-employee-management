const Announcement = require("../models/announcement");
const {} = require('../utils/helper')

exports.getAllAnnouncement = async (req, res) => {
  const announcements = await Announcement.findAll();
  res.send(announcements);
};

exports.getAllAnnouncementById = async (req, res) => {
  const announcement = await Announcement.findByPk(req.params.id);
  res.send(announcement);
};

exports.addAnnouncement = async (req, res) => {
  const message = req.body.message;
  const organizationId = req.body.organizationId;

  const announcement = await Announcement.create({
    message: message,
    organizationId: organizationId,
  });
  res.send(announcement);
};
