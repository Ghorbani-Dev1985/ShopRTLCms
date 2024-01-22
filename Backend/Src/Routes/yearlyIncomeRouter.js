const express = require("express");
const YearlyIncomeModel = require("../Models/YearlyIncome");
const yearlyIncomeRouter = express.Router();


// ** Get YearlyIncome Info APi
yearlyIncomeRouter.get("/all", (req, res) => {
  YearlyIncomeModel.find({}).then((yearlyIncomeModel) => {
    res.send(yearlyIncomeModel);
  });
});


module.exports = yearlyIncomeRouter;
