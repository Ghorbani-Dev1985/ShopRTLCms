const mongoose = require("mongoose");

let YearlyIncomeSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  sale: {
    type: Number,
    require: true,
    trim: true,
  },
});

let YearlyIncome = mongoose.model("YearlyIncome", YearlyIncomeSchema);

module.exports = YearlyIncome;
