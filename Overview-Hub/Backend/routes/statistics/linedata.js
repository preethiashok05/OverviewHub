const express = require('express');
const { addLineData , getLineData } = require('../../controllers/statistics/linedata');

const router = express.Router();
router.post('/addline', addLineData);
router.get('/getline', getLineData);

module.exports = router;