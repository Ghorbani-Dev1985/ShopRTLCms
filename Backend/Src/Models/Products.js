const mongoose = require("mongoose");

let ProductsSchema = mongoose.Schema({
  productTitle: {
    type: String,
    require: true,
    minLength: 3,
    maxLength: 100,
    trim: true,
  },
  productDesc: {
    type: String,
    require: true,
    minLength: 3,
    maxLength: 500,
    trim: true,
  },
  productImg: {
    type: String,
    require: true,
    minLength: 3,
    trim: true,
  },
  categoryID : {
    type: String,
    trim: true,
    require: true,
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
  count: {
    type: Number,
    maxLength: 200,
    require: true,
    trim: true,
  },
  popularity: {
    type: Number,
    require: true,
    trim: true,
  },
  sale: {
    type: Number,
    require: true,
    trim: true,
  },
  colors: {
    type: Number,
    require: true,
  },
  productUrl: {
    type: String,
    require: true,
    trim: true,
  }
});

let Products = mongoose.model("Products", ProductsSchema);

module.exports = Products;
