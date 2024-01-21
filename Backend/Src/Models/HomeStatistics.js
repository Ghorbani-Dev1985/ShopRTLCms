const mongoose = require("mongoose");

let HomeStatisticsSchema = mongoose.Schema({
  totalPrice: {
    type: Number,
    require: true,
    trim: true,
  },
  totalSale: {
    type: Number,
    require: true,
    trim: true,
  },
  totalIncome: {
    type: Number,
    require: true,
    trim: true,
  },
  totalShipping: {
    type: Number,
    require: true,
    trim: true,
  },
  pricePercent: {
    type: Number,
    require: true,
    trim: true,
  },
  salePercent: {
    type: Number,
    require: true,
    trim: true,
  },
  incomePercent: {
    type: Number,
    require: true,
    trim: true,
  },
  shippingPercent: {
    type: Number,
    require: true,
    trim: true,
  },
});

let HomeStatistics = mongoose.model("HomeStatistics", HomeStatisticsSchema);

module.exports = HomeStatistics;
