const express = require('express');
const { addInvoiceData , getInvoiceData,deleteInvoiceData } = require('../../controllers/statistics/invoicedata');

const router = express.Router();

router.post('/addinvoice', addInvoiceData);
router.get('/getdata', getInvoiceData);
router.delete('/deletedata/:id' , deleteInvoiceData);

module.exports = router;