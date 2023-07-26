const express = require('express');
const  { addPieData , getPieData } = require('../../controllers/statistics/piedata');

const router = express.Router();

router.post('/addpie', addPieData);
router.get('/getpie', getPieData);


module.exports = router;