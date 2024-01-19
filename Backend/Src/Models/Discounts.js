const mongoose = require("mongoose");

let DiscountSchema = mongoose.Schema({
  discountCode: {
    type: String,
    require: true,
    trim: true,
  },
  CREATED_AT: {
    type: String,
    require: true,
    trim: true,
  },
  percent: {
    type: Number,
    require: true,
    trim: true,
  },
  adminID: {
    type: Number,
    require: true,
    trim: true,
  },
  productID: {
    type: Number,
    require: true,
    trim: true,
  },
  isActive: {
    type: Boolean,
    require: true,
  },
});

let Discounts = mongoose.model("Discounts", DiscountSchema);

module.exports = Discounts;
