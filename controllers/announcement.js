const Announcement = require("../models/announcement");
const Organization = require("../models/organization");
const {success, fail} = require('../utils/helper')

exports.getAllAnnouncement = async (req, res) => {
  
    try {
      const announcements = await Announcement.findAll();
      res
        .status(200)
        .json(success("OK", { data: announcements }, res.statusCode));
    } catch (error) {
      console.log(error);
    }
    res.status(501).json(fail(error, res.statusCode));
    return;

};

exports.getAllAnnouncementById = async (req, res) => {
   
     try {
       if (!req.params.id) {
         throw "No Match ID";
       }

       const announcement = await Announcement.findByPk(req.params.id);
       res
         .status(200)
         .json(success("OK", { data: announcement }, res.statusCode));
       return;
     } catch (error) {
       console.log(error);
     }
     res.status(501).json(fail(error, res.statusCode));
     return;
};

exports.addAnnouncement = async (req, res) => {

    try {
        const message = req.body.message;
        const organizationId = req.body.organizationId;

      if (!message || !organizationId) {
        return res.status(422).json({ error: "Please input all field" });
      }

      let organization = await Organization.findByPk(organizationId);
      if (!organization)
        return res.status(400).json({ msg: "No registered Organization Found." });

      const announcement = await Announcement.create({
        message: message,
        organizationId: organizationId,
      });
      res
        .status(200)
        .json(
          success("Add Successfully", { data: announcement }, res.statusCode)
        );
    } catch (error) {
      console.log(error);
    }
    res.status(501).json(fail(error, res.statusCode));
    return;
};
