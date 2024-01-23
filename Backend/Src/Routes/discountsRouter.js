const express = require("express");
const DiscountsModel = require("../Models/Discounts");
const discountsRouter = express.Router();


// ** Get All Discounts APi
discountsRouter.get("/all", (req, res) => {
  DiscountsModel.find({}).then((allDiscounts) => {
    res.json(allDiscounts);
  });
});

// ** Delete Discount APi
discountsRouter.delete("/delete", (req, res) => {
  let discountID = req.headers.authorization;
  DiscountsModel.findByIdAndDelete(`${discountID}`).then((result) => {
    res.send(true);
  });
});

// ** Enable Discount APi
discountsRouter.put("/enable", (req, res) => {
  let body = req.body;
  let discountID = req.headers.authorization;
  let isEnableDiscount = {isActive : true}
  DiscountsModel.findByIdAndUpdate(`${discountID}`, isEnableDiscount).then((result) => {
    res.send(true);
  });
});

// ** Disable Discount APi
discountsRouter.put("/disable", (req, res) => {
  let body = req.body;
  let discountID = req.headers.authorization;
  let isDisableDiscount = {isActive : false}
  DiscountsModel.findByIdAndUpdate(`${discountID}`, isDisableDiscount).then((result) => {
    res.send(true);
  });
});

module.exports = discountsRouter;
