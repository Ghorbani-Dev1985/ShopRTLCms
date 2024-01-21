const express = require("express");
const HomeStatisticsModel = require("../Models/HomeStatistics");
const homeStatisticsRouter = express.Router();


// ** Get HomeStatistics Info APi
homeStatisticsRouter.get("/all", (req, res) => {
  HomeStatisticsModel.find({}).then((homeStatistics) => {
    res.send(homeStatistics);
  });
});


module.exports = homeStatisticsRouter;
