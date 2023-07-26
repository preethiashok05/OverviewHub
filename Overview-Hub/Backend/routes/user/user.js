const express = require('express');
const  { addUser , getUsersData} = require('../../controllers/users/users');

const router = express.Router();
router.post('/adduser', addUser);
router.get('/getusers', getUsersData);

module.exports = router;