const express = require("express");
const HomeStatisticsModel = require("../Models/HomeStatistics");
const homeStatisticsModelRouter = express.Router();


// ** Get HomeStatistics Info APi
homeStatisticsModelRouter.get("/", (req, res) => {
  HomeStatisticsModel.findById({}).then((HomeStatistics) => {
    res.send(HomeStatistics);
  });
});


module.exports = homeStatisticsModelRouter;
