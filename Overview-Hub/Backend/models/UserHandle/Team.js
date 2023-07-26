const mongoose = require('mongoose');


const teamSchema = new mongoose.Schema({
    email:String,
    access: String,
});

const Team = mongoose.model('Team', teamSchema);

module.exports = {
    Team
};