var unirest = require("unirest");
const models = require("../../../models");

let interactionsInDB = [];
function checkIfInteractionAdded(pair) {
  for (var i = 0; i < interactionsInDB.length; i++) {
    if (
      interactionsInDB[i].name == pair.name &&
      interactionsInDB[i].severity == pair.severity &&
      interactionsInDB[i].description == pair.description &&
      interactionsInDB[i].comment == pair.comment
    ) {
      return true;
    }
  }
  return false;
}

module.exports = {
  async createReport(userId, drugs, notes) {
    let drugBankLink = 
      "https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=";
    drugs.forEach((drug) => {
      drugBankLink += drug + "+";
    });
    drugBankLink = drugBankLink.substring(0, drugBankLink.length - 1);
  
    let report = null;
    let interactionsAdded = false;
  
    const result = await unirest("GET", drugBankLink).send();
    const drugBankResponse = JSON.parse(result.raw_body);
    const fullIntType =
      drugBankResponse?.fullInteractionTypeGroup?.[0]?.fullInteractionType;
    
    if (fullIntType) {
      report = await models.Report.create({
        userId: userId,
        drugs: JSON.stringify(drugs),
        notes: notes,
      });
  
      for (const intType of fullIntType) {
        const { minConcept = [] } = intType;
        let name = "";
        minConcept.forEach((concept) => {
          name += "(" + concept.name + ") - ";
        });
  
        name = name.substring(0, name.length - 3);
        const comment = intType?.comment;
        if (Array.isArray(intType?.interactionPair)) {
          for (const intPair of intType.interactionPair) {
            const severity = intPair?.severity;
            const description = intPair?.description;
            const pair = {
              name,
              comment,
              severity,
              description,
              source:
                drugBankResponse?.fullInteractionTypeGroup?.[0]?.sourceName,
            };
  
            if (!interactionsAdded) {
              interactionsAdded = true;
            }
            await report.createInteraction(pair);
          }
        }
      }
    }
  
    return interactionsAdded ? report : null;
  },
  

  async getReport(id) {
    try {
      const Report = await models.Report.findOne({
        where: {
          id,
        },
        include: [
          {
            model: models.Interaction,
          },
        ],
      });
      console.log(Report);
      return Report;
    } catch (err) {
      throw new Error(err);
    }
  },

  // async getReport(id) {
  //   return Report.findByPk(id);
  // },

  async getAllReports() {
    try {
      const Report = await models.Report.findAll({
        include: [
          {
            model: models.Interaction,
          },
        ],
      });

      return Report;
    } catch (err) {
      throw new Error(err);
    }
  },

  async updateReport(id, updates) {
    return Report.update(updates, { where: { id } });
  },

  async  deleteReport(id) {
    try {
      await Report.destroy({ where: { id } });
    } catch (err) {
      // Handle the error
    }
  }
};


