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
  let updateProductInfo = {
    productTitle: body.productTitle,
    productDesc: body.productDesc,
    productImg: body.productImg,
    categoryID: body.categoryID,
    price: body.price,
    count: body.count,
    popularity: body.popularity,
    sale: body.sale,
    colors: body.colors,
    productUrl: body.productUrl,
  };
  ProductsModel.findByIdAndUpdate(`${productID}`, updateProductInfo).then((result) => {
    res.send(true);
  });
});

// ** Add New Product APi
productRouter.post("/newProduct", (req, res) => {
  let body = req.body;
  let date = new Date().toLocaleDateString('fa-IR');
  let newProductInfo = {
    CREATED_AT : date,
    productTitle: body.productTitle,
    productDesc: body.productDesc,
    productImg: body.productImg,
    categoryID: body.categoryID,
    price: body.price,
    count: body.count,
    popularity: body.popularity,
    sale: body.sale,
    colors: body.colors,
    productUrl: body.productUrl,
  };
  let addNewProduct = new ProductsModel(newProductInfo);
  addNewProduct.save().then((result) => {
    res.send(true);
  });
});

module.exports = productRouter;
