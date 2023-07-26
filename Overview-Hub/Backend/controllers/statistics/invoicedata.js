const { number } = require('yup');
const { Invoice}  = require('../../models/Statistics/Invoice'); 

exports.addInvoiceData = (req, res) => {
  const { color ,data } = req.body; // Assuming the request body contains all the required fields

  const newInvoiceData = new Invoice({
    color:color,
    data:data
  });

  newInvoiceData.save((err) => {
    if (err) {
      console.error('Error saving line data:', err);
      res.status(500).json({ error: 'An error occurred while saving the Invoice data.' });
    } else {
      res.status(201).json({ message: 'Invoice data added successfully.' });
    }
  });
};

exports.getInvoiceData = async (req, res) => {
  try {
    const data = await Invoice.find();
    res.status(200).json(data);
    
  } catch (error) {
    console.error('Error fetching  data:', error);
    res.status(500).json({ error: 'An error occurred while fetching  data.' });
  }
};

exports.deleteInvoiceData = async (req, res) => {
  console.log("deletion started")
    const invoiceId = req.query.id;

    try {
      // Find the invoice by ID and delete it
      const deletedInvoice = await Invoice.findOneAndDelete({ id: +invoiceId });
    
      if (deletedInvoice) {
        res.status(200).json({ message: 'Invoice deleted successfully.' });
      } else {
        res.status(404).json({ error: 'Invoice not found.' });
      }
    } catch (error) {
      console.error('Error deleting invoice:', error);
      res.status(500).json({ error: 'An error occurred while deleting the invoice.' });
    }
};

