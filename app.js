const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require('./utils/db')

const app = express();

const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')
const organizationRoute = require('./routes/organization')
const employeeRoute = require("./routes/employee");
const payrollRoute = require("./routes/payroll");
const attendenceRoute = require("./routes/attendence");
const leaveReqRoute = require("./routes/leaveRequest");
const announcementRoute = require("./routes/announcement");
const costManage = require("./routes/costManage");

const User = require('./models/user')
const Organization = require('./models/organization')
const Employee = require('./models/employee')
const Payroll = require("./models/payroll");
const Attendence = require("./models/attendence");
const LeveRequest = require('./models/leaveRequest');
const Announcement = require("./models/announcement");
const CostManage = require("./models/costManage");

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use("/api/auth", authRoutes);
app.use('/api/user', userRoutes)
app.use('/api/company', organizationRoute)
app.use("/api/employee", employeeRoute);
app.use("/api/payroll", payrollRoute);
app.use("/api/attendence", attendenceRoute);
app.use("/api/leave-request", leaveReqRoute);
app.use("/api/announcement", announcementRoute );
app.use("/api/cost", costManage);

const port = process.env.PORT || 3000;

// sequelize.sync({ alter: true})
// .then( () => {
//     app.listen(port, () =>
//       console.log(`Server Running on the port ....${port}`)
//     );
//     console.log()
// })
// .catch( err => {
//     console.log(err)
// })

 (async () => {
    await sequelize.sync({ alter: true });
    app.listen(port, () =>
      console.log(`Server Running on the port ....${port}`)
    );
})()

User.hasMany(Organization)
Organization.belongsTo(User)

Organization.hasMany(Employee)
Employee.belongsTo(Organization)

Employee.hasOne(Payroll)
Payroll.belongsTo(Employee)

Employee.hasOne(Attendence);
Attendence.belongsTo(Employee);

Employee.hasMany(LeveRequest);
LeveRequest.belongsTo(Employee);  

Organization.hasMany(Announcement);
Announcement.belongsTo(Organization);

Organization.hasMany(CostManage);
CostManage.belongsTo(Organization);