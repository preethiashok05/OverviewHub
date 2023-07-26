const mongoose = require('mongoose');
require('dotenv').config();


const mongodbURI = 'mongodb+srv://Preethi1234:785634210@cluster0.kwktc.mongodb.net/dashboard?authSource=admin&replicaSet=atlas-5pq5hh-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'

mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

// Export the mongoose object
module.exports = mongoose;
