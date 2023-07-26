const mongoose = require('mongoose');

const roleUsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  subscribedTopics: {
    type: [String],
    default: [],
  },
});

const RoleUsers = mongoose.model('RoleUsers', roleUsersSchema);

module.exports = RoleUsers;
