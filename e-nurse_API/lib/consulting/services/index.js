const models = require("../../../models");

const createConsulting = async (data) => {
  try {
    models.Consulting.create(data);
    return createConsulting
  }
  catch (err) {
      throw new Error(err);
    }
  
 
};
const findConsultingById = async (id) => {
  try {
    const Consulting = await models.Consulting.findByPk(id, {
      where: {
        id,
      },
      include: [
        {
          model: models.User,
        },
        {
          model: models.Message ,
        },
        {
          model: models.Report,
          include: [
            {
              model: models.User,
            },
           
          ],
        },
      ],
    });
    
    return Consulting;
  } catch (err) {
    throw new Error(err);
  }
 
};

const findAllConsultingsForUser = async ({userId}) =>{
  try {
    const Consulting = await models.Consulting.findAll({
      
      include: [
        {
          model: models.User,
        },
        {
          model: models.Message,
        },
        {
          model: models.Report,
          where : {
            userId 
          },
         
        },
      ],
    });
   
    return Consulting;

  }catch (err) {
    console.log(err);
    throw new Error(err);
  }
}




const findAllConsultings = async ({userId}) => {
  try {
    
    const Consulting = await models.Consulting.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: models.User,
        },
        {
          model: models.Message,
        },
        {
          model: models.Report,
          include: [
            {
              model: models.User,
            },
          ],
        },
      ],
    });
   
    return Consulting;
    
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
 
};

const updateConsulting = (id, data) => {
  return Consulting.update(data, {
    where: { id },
  });
};

const deleteConsulting = (id) => {
  return Consulting.destroy({
    where: { id },
  });
};

module.exports = {
  createConsulting,
  findConsultingById,
  findAllConsultings,
  updateConsulting,
  deleteConsulting,
  findAllConsultingsForUser
};
