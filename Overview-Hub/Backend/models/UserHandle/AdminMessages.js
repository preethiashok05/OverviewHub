const mongoose = require('mongoose');

const adminMessagesSchema = new mongoose.Schema({
  messages: [
    {
      topic: {
        type: String,
        required: true
      },
      messages: {
        type: [String],
        required: true
      }
    }
  ],
  time: {
    type: Date,
    default: Date.now
  }
});

const AdminMessages = mongoose.model('AdminMessages', adminMessagesSchema);

module.exports = AdminMessages;
