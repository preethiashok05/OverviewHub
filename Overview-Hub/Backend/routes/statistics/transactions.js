const express = require('express');
const { addTransaction , getData } =  require('../../controllers/statistics/transaction');

const router = express.Router();

router.post('/addtransaction', addTransaction);
router.get('/getdata', getData);

module.exports = router;