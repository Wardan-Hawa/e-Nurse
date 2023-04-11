const { avatar } = require("../users/controllers");
const models = require("../../models");

const userTransformer = (user) => {
  if (user?.dataValues?.password) {
    delete user.dataValues.password;
  }
  if (user?.UserMeta) {
    user.UserMeta = TransformerUserMetas(user?.UserMeta);
  }
  return user;
};
const TransformerUsers = (Users) => {
  return Users.map((User) => userTransformer(User));
};
const reportTransformer = (report) => {
  const transformeredReport = {};
  if (report) {
    transformeredReport.id = report?.id;
    transformeredReport.name = report?.name;

    transformeredReport.drugs = report?.drugs;
    transformeredReport.notes = report?.notes;
    transformeredReport.comment = report?.comment;
    transformeredReport.severity = report?.severity;
    transformeredReport.description = report?.description;
    transformeredReport.source = report?.source;
    transformeredReport.createdAt = report?.createdAt;

    return transformeredReport;
  }
  return report;
};

const reportsTransformer = (reports) => {
  if (Array.isArray(reports) && reports.length != 0) {
    const result = reports.map((report) => reportTransformer(report));
    return result;
  }
  return reports;
};

const transformeredUserMeta = (UserMetaItem) => {
  if (UserMetaItem && UserMetaItem.metaKey === "avatar") {
    UserMetaItem.metaValue =
      process.env.serverUrl + "/uploads/" + UserMetaItem.metaValue;
  } else if (UserMetaItem.metaKey === "certificates") {
    let certificates = JSON.parse(UserMetaItem.metaValue);
    UserMetaItem.metaValue = certificates.map((cert) => {
      return {
        ...cert,
        certificate: process.env.serverUrl + "/uploads/certificates/" + cert.certificate,
      };
    });
  }
  return UserMetaItem;
};

const TransformerUserMetas = (UserMeta) => {
  return UserMeta.map((UserMetaItem) => transformeredUserMeta(UserMetaItem));
};

const specialitiTransformer = (Speciality) => {
  // let Users = Speciality.dataValues.Users ;
  // if(Array.isArray(Users) && Users.length != 0){
  //     const result = Users.map(User => userTransformer(User))
  //     return result
  // }
  // return User
  let user = Speciality?.dataValues?.Users;
  if (user) {
    user = TransformerUsers(user);
  }
  return Speciality;
};



module.exports = {
  userTransformer,
  reportTransformer,
  reportsTransformer,
  transformeredUserMeta,
  TransformerUserMetas,
  TransformerUsers,
  specialitiTransformer,
  
};
