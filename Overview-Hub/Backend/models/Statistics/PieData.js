const mongoose = require('mongoose');

const pieDataSchema = new mongoose.Schema({
    id :  {
      type: String,
      required: true,
    },
    label:  {
      type: String,
      required: true,
    },
    value:  {
      type: Number,
      required: true,
    },
    color:  {
      type: String,
      required: true,
    },
} );

const PieData = mongoose.model('PieData', pieDataSchema);

module.exports = {
    PieData
};