const express = require('express');
const { getFiles, downloadFile, convertToPdf } = require('../../controllers/statistics/reports');


const router = express.Router();
router.get('/getfiles', getFiles);
router.get('/download/:filename/:extension', downloadFile);
router.get('/convert/:filename', convertToPdf);

module.exports = router;