const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   id:String,
  name:  {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipCode:{
    type: String,
    required: true,
  },
  registrarId:String
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};