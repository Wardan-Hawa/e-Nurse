const models = require("../../../models");
const { successWithMessage, failedWithMessage } = require("../../helper/responses");
const {putview} = require("../services")

const createMessage = async (req, res) => {
  try {
    const message = await models.Message.create({
      userId: req.user.id,
      consultingId: req.params.id,
      content: req.body.content
    }, {
      include: [{ model: models.User, as: "User" }]
    });

    if (!message) return res.status(400).send({ message: "Error creating message." });

    return successWithMessage("Message created successfully.", res, message)
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};


const getAllMessages = async (req, res) => {
  try {
    const messages = await models.Message.findAll({
      where: { consultingId: req.params.id },
      include: [{ model: models.User, as: "User" }]
    });

    const viewedMsgs = [];

    for (const message of messages) {
      const viewedMessage = await message.update({
        viewedAt: new Date() // add timestamp to viewedAt field
      });
      viewedMsgs.push(viewedMessage); // add message to viewedMsgs array
    }

    return res.status(200).send({
      message: "Messages retrieved successfully.",
      data: viewedMsgs // return viewedMsgs instead of messages
    });
  } catch (error) {
    return res.status(400).send({
      message: "Error retrieving messages.",
      error: error
    });
  }
};

const viewedAt = async (req, res) => {
  try {
    const { id } = req.params;
  const smessage = await putview({userId:id})
  console.log("weeeeeee", smessage);
  
  if (smessage[0])
  return  successWithMessage ("message was seen", res  )
  else failedWithMessage (" massage was not seen ", res )
  } catch (err) {
      console.log("ERROR from service --> ", err);
      throw new Error(err);
    }
  }


  const markAllMessagesAsViewed = async () => {
    try {
      const messages = await models.Message.findAll({ where: { viewedAt: null } });
      
      if (messages.length > 0) {
        await models.Message.update(
          { viewedAt: Date() },
          { where: { viewedAt: null } }
        );
        
        return { success: true, message: `Marked ${messages.length} messages as viewed.` };
      } else {
        return { success: false, message: "No messages to mark as viewed." };
      }
    } catch (err) {
      console.log("Error marking messages as viewed:", err);
      throw new Error(err);
    }
  };

module.exports = {
  createMessage,
  getAllMessages,
  viewedAt,
  markAllMessagesAsViewed
};
