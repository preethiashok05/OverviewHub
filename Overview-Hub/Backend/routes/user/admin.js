const express = require('express');
const { io } = require('../../config/socket');
const router = express.Router();
const {sendMsg} = require('../../controllers/users/admin');

router.post('/sendmsg', (req, res) => {
    sendMsg(req, res);
  });

module.exports = router;
