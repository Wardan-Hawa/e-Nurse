const ReportService = require("../../report/services");
const response = require("../../helper/responses");
const { reportsTransformer } = require("../../transformers");
const { createReport } = require("../../report/services");

module.exports = {
  async create(req, res) {
    try {
      const { drugs, notes, name } = req.body;
      if (drugs?.length < 0)
        return response.failedWithMessage("drugs con not be empty", res);
      if (notes?.length < 0)
        return response.failedWithMessage("drugs con not be empty", res);

      const report = await ReportService.createReport(
        req.user.id,
        drugs,
        notes,
        name
      );
       console.log("1111111", report);
      if (report)
        return response.successWithMessage("report created successfully", res, {
          report: req.body,
        });
      else
        return response.failedWithMessage(
          "no interaction data available",
          res
        );
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },

  async get(req, res) {
    const { id } = req.params;
    const report = await ReportService.getReport(id);
    return res.json(report);
  },

  async getAll(req, res) {
    try {
      const reports = await ReportService.getAllReports();

      return response.successWithMessage("getting reports successfully", res, {
        reports,
      });
    } catch (err) {
      console.log("ERROR from service --> ", err);
      throw new Error(err);
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { userId, drugs, notes } = req.body;
    const updates = { userId, drugs, notes };
    await ReportService.updateReport(id, updates);
    return res.sendStatus(200);
  },

  async delete(req, res) {
    const { id } = req.params;
    await ReportService.deleteReport(id);
    return response.successWithMessage("delete report successfully", res);
  },
  catch(err) {
    console.log("ERROR from service --> ", err);
    throw new Error(err);
  },
};
