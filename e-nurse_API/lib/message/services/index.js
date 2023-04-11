const { Message } = require("../../../models");
const models = require("../../../models");

const createMessage = (data) => {
  return Message.create(data);
};

const findMessageById = (id) => {
  return Message.findByPk(id, {
    include: ["User", "Consulting"],
  });
};

const findAllMessages = () => {
  return Message.findAll({
    include: ["User", "Consulting"],
  });
};

const updateMessage = (id, data) => {
  return Message.update(data, {
    where: { id },
  });
};

const deleteMessage = (id) => {
  return Message.destroy({
    where: { id },
  });
};


const putview = async ({userId: id }) => {
  try {
    const Message = await models.Message.update(
    
      {
        viewedAt: Date()
    },
    {
      where:{
       id
      }
     },
      )
  return Message
  }catch (err) {
    console.log("ERROR FROM SERVİCE-->", err);
    throw new Error(err);
  }
}





module.exports = {
  createMessage,
  findMessageById,
  findAllMessages,
  updateMessage,
  deleteMessage,
  putview
};
