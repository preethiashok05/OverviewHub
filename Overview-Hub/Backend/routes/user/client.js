const express = require('express');
const router = express.Router();
const {getMessages, getUserTopicsAndMessages, updateSubscription} = require('../../controllers/users/client');

router.get('/general', getMessages);
router.post('/allMessages' , getUserTopicsAndMessages)
router.post('/updateSubscription' , updateSubscription);
module.exports = router;
