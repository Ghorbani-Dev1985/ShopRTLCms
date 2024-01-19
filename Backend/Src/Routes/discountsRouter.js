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

// ** Update Discount APi
discountsRouter.put("/update", (req, res) => {
  let body = req.body;
  let discountID = req.headers.authorization;
  let updateDiscount = body.isActive;
  DiscountsModel.findByIdAndUpdate(`${discountID}`, updateDiscount).then((result) => {
    res.send(true);
  });
});

module.exports = discountsRouter;
