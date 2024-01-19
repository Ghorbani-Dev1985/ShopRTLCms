const mongoose = require("mongoose");

let OrdersSchema = mongoose.Schema({
  userID: {
    type: Number,
    require: true,
    trim: true,
  },
  CREATED_AT: {
    type: String,
    require: true,
    trim: true,
  },
  CREATED_HOUR: {
    type: String,
    require: true,
    trim: true,
  },
  price: {
    type: Number,
    maxLength: 50,
    require: true,
    trim: true,
  },
  discount: {
    type: Number,
    maxLength: 100,
    require: true,
    trim: true,
  },
  sale: {
    type: Number,
    maxLength: 50,
    require: true,
    trim: true,
  },
  popularity: {
    type: Number,
    maxLength: 50,
    require: true,
  },
  count: {
    type: Number,
    maxLength: 50,
    trim: true,
  },
  saleCount: {
    type: Number,
    trim: true,
  },
  isActive: {
    type: Boolean,
    trim: true,
  }
});

let Orders = mongoose.model("Orders", OrdersSchema);

module.exports = Orders;
