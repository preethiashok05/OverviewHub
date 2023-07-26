const mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema({
    txId: String,
    user: String,
    date:  { 
      type : Date,
      default: Date.now 
    },
    cost: String
  });

const Transactions = mongoose.model('Transactions', transactionsSchema);

module.exports = {
    Transactions 
};