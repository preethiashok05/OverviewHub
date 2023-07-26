const { Transactions } = require('../../models/Statistics/Transactions'); 

exports.addTransaction = (req, res) => {
  const { txId,user , email, cost } = req.body; 

  const newTransaction = new Transactions({
    txId: txId,
    user:user,
    email: email,
    cost: cost,
  });

  newTransaction.save((err) => {
    if (err) {
      console.error('Error saving transaction:', err);
      res.status(500).json({ error: 'An error occurred while saving the transaction.' });
    } else {
      res.status(201).json({ message: 'Transaction added successfully.' });
    }
  });
};

exports.getData = async (req, res) => {
  try {
    const data = await Transactions.find();
    res.status(200).json(data);
    
  } catch (error) {
    console.error('Error fetching pie data:', error);
    res.status(500).json({ error: 'An error occurred while fetching pie data.' });
  }
};
