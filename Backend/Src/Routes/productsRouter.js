const express = require("express");
const ProductsModel = require("../Models/Products");
const productRouter = express.Router();

// ** Get All Products APi
productRouter.get("/all", (req, res) => {
  ProductsModel.find({}).then((allProducts) => {
    res.json(allProducts);
  });
});

// ** Get Main Product Info APi
productRouter.get("/product", (req, res) => {
  let productID = req.headers.authorization;

  ProductsModel.findById(`${productID}`).then((mainProductInfo) => {
    res.send(mainProductInfo);
  });
});

// ** Delete Main Product APi
productRouter.delete("/delete", (req, res) => {
  let productID = req.headers.authorization;
  ProductsModel.findByIdAndDelete(`${productID}`).then((result) => {
    res.send(true);
  });
});

// ** Update Main Product APi
productRouter.put("/update", (req, res) => {
  let body = req.body;
  let productID = req.headers.authorization;
  let userProductInfo = {
    productTitle: body.productTitle,
    productImg: body.productImg,
    price: body.price,
    discountPrice: body.discountPrice,
    stock: body.stock,
    productType : body.productType
  };
  ProductsModel.findByIdAndUpdate(`${productID}`, userProductInfo).then((result) => {
    res.send(true);
  });
});

// ** Add New Product APi
productRouter.post("/newProduct", (req, res) => {
  let body = req.body;
  let date = new Date().toLocaleDateString('fa-IR');
  let newProductInfo = {
    productTitle: body.productTitle,
    productImg: body.productImg,
    CREATED_AT : date,
    price: body.price,
    discountPrice: body.discountPrice,
    stock: body.stock,
    productType : body.productType
  };
  let addNewProduct = new ProductsModel(newProductInfo);
  addNewProduct.save().then((result) => {
    res.send(true);
  });
});

module.exports = productRouter;
