const express = require('express');
const { addTeam , getData } =  require('../../controllers/users/team');

const router = express.Router();

router.post('/addteam', addTeam);
router.get('/getdata', getData);

module.exports = router;