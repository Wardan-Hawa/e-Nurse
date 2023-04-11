const response = require("../../helper/responses");
const services = require("../services");

const create = async (req, res) => {
  try {
    const { reportId, userId } = req.body;
    if (!reportId) {
      response.failedWithMessage("you should choose a report", res);
    } else if (!userId) 
     return response.failedWithMessage("you should choose a doctor", res);
    

    const consulting = await services.createConsulting({ reportId, userId });

    if (!consulting)
   { response.failedWithMessage("you should choose a report and doctor", res);}
   else
      return response.successWithMessage(
        "Consulting created successfully",
        res,
        consulting
      );
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(res);
  }
};

const findById = async (req, res) => {
  try {
    const consulting = await services.findConsultingById(
      req.params.id
    );
    if (!consulting) {
      return res.status(404).json({ message: "Consulting not found" });
    }
    return (response.successWithMessage('', res, consulting));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const consultings = await services.findAllConsultings({userId: req.user.id});
    
    return response.successWithMessage("Getiing consultings successfully", res,  consultings  );
    
  } catch (error) {
    return res.status(500).json({ message: error.message });  
  }
};

const findAllForUser = async (req, res) => {
  try {
    const consultings = await services.findAllConsultingsForUser({userId: req.user.id});
    
    return response.successWithMessage("Getiing consultings successfully", res,  consultings  );
    
  } catch (error) {
    return res.status(500).json({ message: error.message });  
  }
};

const update = async (req, res) => {
  try {
    const [updated] = await services.updateConsulting(
      req.params.id,
      req.body
    );
    if (!updated) {
      return res.status(404).json({ message: "Consulting not found" });
    }
    return res.status(200).json({ message: "Consulting updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await services.deleteConsulting(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Consulting not found" });
    }
    return res.status(200).json({ message: "Consulting deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
  findById,
  findAll,
  update,
  remove,
  findAllForUser
};
