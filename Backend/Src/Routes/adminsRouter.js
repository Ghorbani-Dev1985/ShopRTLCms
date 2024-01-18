const express = require("express");
const ProductsModel = require("../Models/Products");
const productRouter = express.Router();


// ** Get Admin Info APi
productRouter.get("/admin", (req, res) => {
  let adminToken = req.headers.authorization;

  ProductsModel.findById(`${adminToken}`).then((admin) => {
    res.send(admin);
  });
});


module.exports = productRouter;
