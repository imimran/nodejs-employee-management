const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require('./utils/db')
const cors = require('cors')

const app = express();

const userRoutes = require('./routes/user/user')
const authRoutes = require('./routes/user/auth')
const organizationRoute = require('./routes/admin/organization')
const employeeRoute = require("./routes/admin/employee");
const payrollRoute = require("./routes/admin/payroll");
const attendenceRoute = require("./routes/admin/attendence");
const leaveReqRoute = require("./routes/admin/leaveRequest");
const announcementRoute = require("./routes/admin/announcement");
const costManage = require("./routes/admin/costManage");

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
app.use(express.static(__dirname+"./uploads"))
app.use("/uploads", express.static("./uploads"));
app.use(cors())

app.use("/api/auth", authRoutes);
app.use('/api/user', userRoutes)
app.use('/api/company', organizationRoute)
app.use("/api/employee", employeeRoute);
app.use("/api/payroll", payrollRoute);
app.use("/api/attendence", attendenceRoute);
app.use("/api/leave-request", leaveReqRoute);
app.use("/api/announcement", announcementRoute );
app.use("/api/cost", costManage);

const port = process.env.PORT || 4000;

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
    //await sequelize.sync({ alter: true });
    await sequelize.sync()
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
Organization.hasMany(Payroll);
Payroll.belongsTo(Organization);


Employee.hasOne(Attendence);
Attendence.belongsTo(Employee);
Organization.hasMany(Attendence);
Attendence.belongsTo(Organization);

Employee.hasMany(LeveRequest);
LeveRequest.belongsTo(Employee); 
Organization.hasMany(LeveRequest) 
LeveRequest.belongsTo(Organization)

Organization.hasMany(Announcement);
Announcement.belongsTo(Organization);

Organization.hasMany(CostManage);
CostManage.belongsTo(Organization);