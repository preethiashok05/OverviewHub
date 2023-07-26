const mongoose = require('mongoose');

const GeographyDataSchema = new mongoose.Schema({
  value: {
      type: Number,
      required: true,
    },
  });
  
const GeographyData = mongoose.model('GeographyData', GeographyDataSchema);

module.exports = {
  GeographyData
};