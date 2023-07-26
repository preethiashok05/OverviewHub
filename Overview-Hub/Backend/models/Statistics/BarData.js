const mongoose = require('mongoose');

const barDataSchema = new mongoose.Schema({
    country: String,
    hotDog: {
      type: Number,
      default: 0,
    },
    burger: {
      type: Number,
      default: 0,
    },
    kebab: {
      type: Number,
      default: 0,
    },
    donut: {
      type: Number,
      default: 0,
    },
    others:{
      type: Number,
      default: 0,
    },
});

const BarData = mongoose.model('BarData', barDataSchema);

module.exports = {
    BarData
};