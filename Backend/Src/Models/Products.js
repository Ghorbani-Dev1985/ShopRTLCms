const mongoose = require("mongoose");

let ProductsSchema = mongoose.Schema({
  productTitle: {
    type: String,
    require: true,
    minLength: 3,
    maxLength: 100,
    trim: true,
  },
  productImg: {
    type: String,
    require: true,
    minLength: 3,
    trim: true,
  },
  CREATED_AT: {
    type: String,
    require: true,
    trim: true,
  },
  price: {
    type: Number,
    require: true,
    minLength: 3,
    trim: true,
  },
  discountPrice: {
    type: Number,
    require: true,
    minLength: 3,
    trim: true,
  },
  stock: {
    type: Number,
    require: true,
    trim: true,
  },
  productType: {
    type: Boolean,
    require: true,
  }
});

let Products = mongoose.model("Products", ProductsSchema);

module.exports = Products;
