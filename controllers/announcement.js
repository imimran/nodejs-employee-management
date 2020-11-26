const Announcement = require("../models/announcement");
const Organization = require("../models/organization");
const { success, fail, validation } = require("../utils/helper");
const { authUser, authEmployee } = require("../utils/auth");
const Employee = require("../models/employee");

exports.getAllAnnouncement = async (req, res) => {
  try {
    const token = req.header("auth-token");
    auth_user = await authUser(token);
    auth_employee = await authEmployee(token);
    let announcements;
    if (auth_employee.isValid == 1) {
      announcements = await Announcement.findAll({
        where: {
          $employeeId$: auth_employee.id,
          //"$organization.userId$": auth_user.id,
        },
        include: [
          {
            model: Organization,
          },
             {
               model: Employee,
             },
        ],
      });
    } else {
      announcements = await Announcement.findAll({
        where: {
          "$organization.userId$": auth_user.id,
        },
        include: [
          {
            model: Organization,
          },
          {
            model: Employee,
          },
        ],
      });
    }
    
    res
      .status(200)
      .json(success("OK", { data: announcements }, res.statusCode));
  } catch (error) {
    console.log(error);
    res.status(501).json(fail(error, res.statusCode));
    return;
  }
};

exports.getAllAnnouncementById = async (req, res) => {
  try {
    if (!req.params.id) {
      throw "No Match ID";
    }

    const announcement = await Announcement.findByPk(req.params.id);
    res.status(200).json(success("OK", { data: announcement }, res.statusCode));
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
    const employeeId = req.body.employeeId;

    if (!message || !organizationId) {
      return res.status(422).json(validation("Please input all field"));
    }

    let organization = await Organization.findByPk(organizationId);
    if (!organization)
      return res
        .status(400)
        .json(validation("No registered Organization Found."));



    const announcement = await Announcement.create({
      message: message,
      organizationId: organizationId,
      employeeId: employeeId
    });
    res
      .status(200)
      .json(
        success("Add Successfully", { data: announcement }, res.statusCode)
      );
  } catch (error) {
    console.log(error);
    res.status(501).json(fail(error, res.statusCode));
    return;
  }
};
