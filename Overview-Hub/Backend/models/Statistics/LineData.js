const mongoose = require('mongoose');

const LineDataSchema = new mongoose.Schema({
  color: {
      type: String,
      required: true,
    },
    data: [
      {
        x: {
          type: String,
          required: true,
        },
        y: {
          type: Number,
          required: true,
        },
      },
    ],
  });

const LineData = mongoose.model('LineData', LineDataSchema);

module.exports = {
  LineData
};