const express = require('express');
const { addBarData , getBarData } = require('../../controllers/statistics/bardata');

const router = express.Router();
router.post('/addbar', addBarData);
router.get('/getbar', getBarData);

module.exports = router;