const express = require("express");
const yearlyIncomeModel = require("../Models/YearlyIncome");
const yearlyIncomeRouter = express.Router();


// ** Get YearlyIncome Info APi
yearlyIncomeRouter.get("/all", (req, res) => {
  yearlyIncomeModel.find({}).then((yearlyIncomeData) => {
    console.log(yearlyIncomeData)
    res.json(yearlyIncomeData);
  });
});

// ** Add New YearlyIncome APi
yearlyIncomeRouter.post('/newYearlyIncome', (req , res) => {
  let body = req.body
  let newYearlyIncomeInfo = {
      name : body.name,
      sale: body.sale,
  }
  let addNewYearlyIncomeInfo = new yearlyIncomeModel(newYearlyIncomeInfo)
  addNewYearlyIncomeInfo.save().then(result => {
      res.send(true)
  })
})


module.exports = yearlyIncomeRouter;
