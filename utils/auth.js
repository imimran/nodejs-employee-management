const jwt = require("jsonwebtoken")
const {jwtKey} = require("./key")
const User = require("../models/user");
const Organization = require("../models/organization");

exports.authUser = async (token) => {
     try {
         const decoded = jwt.verify(token, jwtKey)

         auth_user = await User.findOne({where: {id: decoded.id}}).then(data => {return data;});
        //  console.log(auth_user);
         return auth_user;
     } catch (error) {
         throw error;
     }
}

// exports.authOrganizer = async () => {
//   try {
//     auth_organizer = await Organization.findByPk(organizationId);
    
//     console.log(auth_organizer);
//     //return auth_organizer;
//   } catch (error) {
//     throw error;
//   }
// };