const { LineData }  = require('../../models/Statistics/LineData'); 

exports.addLineData = (req, res) => {
  const { color ,data } = req.body; // Assuming the request body contains all the required fields

  const newLineData = new LineData({
    color:color,
    data:data
  });

  newLineData.save((err) => {
    if (err) {
      console.error('Error saving line data:', err);
      res.status(500).json({ error: 'An error occurred while saving the line data.' });
    } else {
      res.status(201).json({ message: 'Line data added successfully.' });
    }
  });
};

exports.getLineData = async (req, res) => {
  try {
    const data = await LineData.find();
    res.status(200).json(data);
    
  } catch (error) {
    console.error('Error fetching  data:', error);
    res.status(500).json({ error: 'An error occurred while fetching  data.' });
  }
};