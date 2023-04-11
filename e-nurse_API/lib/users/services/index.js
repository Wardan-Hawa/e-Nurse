const models = require("../../../models");
const { Op, where } = require("sequelize");
const auth_services = require("../../auth services");
const multer = require("multer");
const { successResponse } = require("../../helper/responses");

const createUser = async ({ name, email, password, userType }) => {
  try {
    const [user, created] = await models.User.findOrCreate({
      where: {
        [Op.and]: [{ [Op.or]: [{ email }, { name }] }, { deletedAt: null }],
      },
      defaults: {
        name,
        password: auth_services.hashPassword(password),
        email,
        userType,
      },
    });
    if (!created) return null;
    return user;
  } catch (err) {
    console.log("ERROR FROM SERVİCE-->", err);
    throw new Error(err);
  }
};

const findUser = async ({ account, password }) => {
  try {
    const user = await models.User.findOne({
      where: {
        [Op.and]: [
          { [Op.or]: [{ name: account }, { email: account }] },
          { deletedAt: null },
        ],
      },
    });
    return user;
  } catch (err) {
    console.log("ERROR FROM SERVİCE-->", err);
    throw new Error(err);
  }
};

const approvedDoctor = async ({ userId: id }) => {
  try {
    const user = await models.User.update(
      {
        approvedAt: Date(),
      },
      {
        where: {
          id,
        },
      }
    );
    return user;
  } catch (err) {
    console.log("ERROR FROM SERVİCE-->", err);
    throw new Error(err);
  }
};

const getUser = async ({ userId: id }) => {
  try {
    const user = await models.User.findOne({
      where: {
        id,
      },
      include: [
        {
          model: models.UserMeta,
        },
        
        {
          model: models.Speciality,
        },
      ],
    });

    return user;
  } catch (err) {
    throw new Error(err);
  }
};

const updateUser = async ({ name, email, password, userId }) => {
  try {
    const user = await models.User.findByPk(userId);
    if (user)
      await user.update({
        name: name,
        email,
        password: auth_services.hashPassword(password),
      });

    return user;
  } catch (err) {
    console.log("ERROR FROM SERVİCE-->", err);
    throw new Error(err);
  }
};

const getAllDoctors = async () => {
  try {
    const user = await models.User.findAll({
      where: [
        {
          userType: "doctor",
        },
      ],

      include: [
        {
          model: models.UserMeta,
        },
        {
          model: models.Speciality,
        },
      ],
    });
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

const getDoctor = async (id) => {
  try {
    const doctor = await models.User.findOne({
      where: [
        {
          userType: "doctor",
          id,
        },
      ],

      include: [
        {
          model: models.UserMeta,
        },
        {
          model: models.Speciality,
        },
      ],
    });
    return doctor;
  } catch (err) {
    throw new Error(err);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext[ext.length - 1]);
  },
});

const uploadFilter = (allowedTypes = "") => {
  return (req, file, cb) => {
    let acceptedMimeTypes = [];
    switch (allowedTypes) {
      case "image":
        acceptedMimeTypes = [
          "image/png",
          "image/jpg",
          "image/jpeg",
          "image/svg+xml",
        ];
        break;
      case "document":
        acceptedMimeTypes = [
          "application/msword",
          "application/pdf",
          "application/json",
        ];
        break;
      default:
        acceptedMimeTypes = Array.isArray(allowedTypes) ? allowedTypes : [];
    }
    if (acceptedMimeTypes.indexOf(file.mimetype) > -1) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
};


const getAllSpecialities = async () => {
  try {
    const Specialities = await models.Speciality.findAll();
    return Specialities;
  } catch (err) {
    throw new Error(err);
  }
};

const getSpecialitie = async (id) => {
  try {
    const Specialitie = await models.Speciality.findOne({
      where: {
        id,
      },
      include: [
        {
          model: models.User,
          include: [
            {
              model: models.UserMeta,
            },
          ],
        },
      ],
    });

    return Specialitie;
  } catch (err) {
    throw new Error(err);
  }
};

const storageG = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/certificates");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext[ext.length - 1]);
  },
});

const uploadFilterG = function (req, file, cb) {
  const acceptedMimeTypes = ["image/png", "image/jpg", "image/jpeg", "application/pdf"];
  if (acceptedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PNG, JPG, JPEG, and PDF files are allowed."));
  }
};
module.exports = {
  createUser,
  findUser,
  getUser,
  updateUser,
  getAllDoctors,
  uploadFilter,
  storage,
  getAllSpecialities,
  getSpecialitie,
  getDoctor,
  approvedDoctor,
  storageG,
  uploadFilterG,
};
