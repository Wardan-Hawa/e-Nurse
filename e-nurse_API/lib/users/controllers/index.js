const response = require("../../helper/responses");
const services = require("../services");
const auth_services = require("../../auth services");
const transformers = require("../../transformers");
const models = require("../../../models");

const register = async (req, res, next) => {
  try {
    const { name, password, email, passwordConfirmation, userType } = req.body;
    if (name?.length < 3)
      return response.failedWithMessage(
        "name is must be more than 3 chars",
        res
      );
    if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
      return response.failedWithMessage("email is invalid", res);

    if (password?.length < 6)
      return response.failedWithMessage("password is invalid", res);

    if (password.localeCompare(passwordConfirmation))
      return response.failedWithMessage("password dose not match !", res);

    if (!/^(user|doctor|admin)$/.test(userType)) {
      return response.failedWithMessage("userType is invalid", res);
    }

    const user = await services.createUser({ name, email, password, userType });
    if (!user)
      return response.failedWithMessage("this user already exist !", res);

    return response.successWithMessage("account created successfully", res);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(res);
  }
};

const login = async (req, res) => {
  try {
    const { account, password } = req.body;

    if (!account || !password)
      return response.failedWithMessage(
        "please fill the account and password !",
        res
      );
    const user = await services.findUser({ account, password });
    if (!user)
      return response.failedWithMessage(
        "user not found please create an account",
        res
      );
    if (!auth_services.checkPassword(password, user?.password))
      return response.failedWithMessage("please check your password", res);
    const transformeredUser = transformers.userTransformer(user);
    const token = auth_services.tokenGenerator({
      id: user.id,
      type: user.userType,
    });
    return response.successWithMessage("logged successfully", res, {
      user: transformeredUser,
      token,
    });
  } catch (err) {
    console.log("ERROR--> ", err);
  }
};

const index = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await services.getUser({ userId });
    // console.log(user);
    if (!user) return response.failedWithMessage("failed to get info", res);
    return response.successWithMessage("user info got successfully", res, {
      user: transformers.userTransformer(user),
    });
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(res);
  }
};

const update = async (req, res, next) => {
  try {
    const name = req?.body?.name.trim();
    const email = req?.body?.email?.trim();
    const currentPassword = req?.body?.currentPassword?.trim();
    const newPassword = req?.body?.newPassword?.trim();
    const userId = req?.user?.id;

    if (name?.length < 3)
      return response.failedWithMessage(
        "name is must be more than 3 chars",
        res
      );
    if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
      return response.failedWithMessage("email is invalid", res);
    if (currentPassword?.length < 6)
      return response.failedWithMessage(
        "password must be at least 6 chat's",
        res
      );

    let password = null;
    if (!newPassword) {
      password = currentPassword;
    } else if (newPassword?.length < 6) {
      return response.failedWithMessage(
        "password must be at least 6 char's",
        res
      );
    } else if (newPassword?.length) {
      {
        password = newPassword;
      }
      password;
    }

    const user = await services.updateUser({
      name,
      email,
      password,
      userId,
    });
    if (user)
      return response.successWithMessage(
        "your account has been updated successfully",
        res
      );
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(res);
  }
};

const logOut = (req, res, next) => {
  try {
    res.cookie("jwt", "", { expires: new Date(0) });
    const decodeToken = auth_services.decodeToken(req.user.token);
    delete decodeToken["iat"];
    delete decodeToken["exp"];
    const codedToken = auth_services.tokenGenerator(decodeToken, "0h");
    return response.successWithMessage("Logged out", res, codedToken);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(res);
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await services.getUser({ userId });
    if (!user)
      return response.failedWithMessage("failed to get user infon", res);
    return response.successWithMessage("the User found successfully ", res, {
      user: transformers.userTransformer(user),
      tasks: transformers.todoesTransformer(user.Tasks),
    });
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(res);
  }
};

const createUserMetum = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return response.failedWithMessage(
        "At least one certificate is required",
        res
      );
    }

    const certificates = [];
    for (let i = 0; i < req.files.length; i++) {
      certificates.push({
        certificateName: req.body.certificateName[i],
        universityName: req.body.universityName[i],
        certificate: req.files[i].filename,
      });
    }

    const createdMeta = await models.UserMeta.create({
      userId: req.user.id,
      metaKey: "certificates",
      metaValue: JSON.stringify(certificates),
    });

    return response.successWithMessage(
      "Certificates have been created successfully",
      res,
      createdMeta
    );
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(res);
  }
};

const avatar = async (req, res, next) => {
  try {
    const userAvatar = await models.UserMeta.findOne({
      where: {
        userId: req.user.id,
        metaKey: "avatar",
      },
    });

    if (userAvatar) {
      await userAvatar.destroy();
    }

    const newAvatar = await models.UserMeta.create({
      userId: req.user.id,
      metaKey: "avatar",
      metaValue: req.files[0].filename,
    });

    const transformedAvatar = transformers.transformeredUserMeta(newAvatar);

    return response.successWithMessage(
      "Avatar has been created successfully",
      res,
      { avatar: transformedAvatar }
    );
  } catch (error) {
    console.error(error);
    return response.errorWithMessage("Unable to create avatar", res);
  }
};

const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await services.getDoctor(id);
    return response.successWithMessage("getting Doctor successfully", res, {
      doctor: transformers.userTransformer(doctor),
    });
  } catch (err) {
    console.log("ERROR from service --> ", err);
    throw new Error(err);
  }
};

const getDoctors = async (req, res, next) => {
  try {
    const user = await services.getAllDoctors();
    if (user?.length == 0)
      return response.failedWithMessage("failed to get Doctors", res);
    return response.successWithMessage("getting Doctors successfully", res, {
      user: transformers.TransformerUsers(user),
    });
  } catch (err) {
    console.log("ERROR from service --> ", err);
    throw new Error(err);
  }
};

const approve = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await services.approvedDoctor({ userId: id });
    console.log(doctor);

    if (doctor[0])
      return response.successWithMessage(
        "doctor approved successfully",
        res,
        doctor
      );
    else
      response.failedWithMessage(" doctor couldnt be approved ", res, doctor);
  } catch (err) {
    console.log("ERROR from service --> ", err);
    throw new Error(err);
  }
};

const getSpecialities = async (req, res, next) => {
  try {
    const specialities = await services.getAllSpecialities();

    if (specialities?.length == 0)
      return response.failedWithMessage("failed to get specialities", res);
    return response.successWithMessage(
      "getting specialities successfully",
      res,
      specialities
    );
  } catch (err) {
    console.log("ERROR from service --> ", err);
    throw new Error(err);
  }
};

const setSpecialities = async (req, res) => {
  try {
    const doctor = await models.User.findByPk(req.user.id);
    await doctor.setSpecialities(req.body.specialityId);

    return response.successWithMessage(
      "speciality created successfullyj",
      res,
      doctor
    );
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(res);
  }
};

const get = async (req, res) => {
  try {
    const { id } = req.params;
    const Speciality = await services.getSpecialitie(id);
    return response.successWithMessage(" get speciality successfullyj", res, {
      Speciality: transformers.specialitiTransformer(Speciality),
    });
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(res);
  }
};
//

 
const certificates = async (req, res, next) => {
  const certificate = await models.UserMeta.findOne ({
    where: {
      userId: req.user.id,
      metaKey: "certificates",
    },
  });

  if (certificate) {
    await certificate.destroy();
  }
  const user = await models.User.findByPk(req.user.id);
  let certificates = [];
  for (var i = 0; i < req.files.length; i++) {
    certificates.push({
      certificateName: req.body.certificateName[i],
      universityName: req.body.universityName[i],
      certificate: process.env.serverUrl + "/uploads/certificates/"  + req.files[i].filename
    });
  }
  await user.createUserMetum({
    metaKey: "certificates",
    metaValue: JSON.stringify(certificates),
  });
  return response.successWithMessage(
    "createUserMetum has been created successfully",
    res,
    // certificates
    certificates   
    
  );
};

module.exports = {
  register,
  login,
  logOut,
  getUser,
  index,
  update,
  createUserMetum,
  getDoctors,
  getDoctorById,
  avatar,
  getSpecialities,
  setSpecialities,
  get,
  approve,
  certificates,
};
