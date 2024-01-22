const express = require("express");
const OrdersModel = require("../Models/Orders");
const ordersRouter = express.Router();


// ** Get All Orders APi
ordersRouter.get("/all", (req, res) => {
  OrdersModel.find({}).then((allOrders) => {
    res.json(allOrders);
  });
});

// ** Delete Order APi
ordersRouter.delete("/delete", (req, res) => {
  let orderID = req.headers.authorization;
  OrdersModel.findByIdAndDelete(`${orderID}`).then((result) => {
    res.send(true);
  });
});

// ** Update Order APi
ordersRouter.put("/update", (req, res) => {
  let body = req.body;
  let orderID = req.headers.authorization;
  let updateOrder = {
    popularity : body.popularity,
    price : body.price,
    sale: body.sale,
    saleCount : body.saleCount
  };
  OrdersModel.findByIdAndUpdate(`${orderID}`, updateOrder).then((result) => {
    res.send(true);
  });
});

module.exports = ordersRouter;
