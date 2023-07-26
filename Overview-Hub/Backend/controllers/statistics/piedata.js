const { PieData } = require('../../models/Statistics/PieData'); 

exports.addPieData = async (req, res) => {
  try{
    const { label, value, color } = req.body; 
    const newPieData = new PieData({
      id:label,
      label: label,
      value: value,
      color: color,
    });
    await newPieData.save();
    res.status(201).json({ message: 'PieData added successfully.' });

  }catch(error){

   console.error('Error saving data:', error);
   res.status(500).json({ error: 'An error occurred while saving the data.' });
  }
};

exports.getPieData = async (req, res) => {
  try {
    const pieData = await PieData.find();
    res.status(200).json(pieData);
    
  } catch (error) {
    console.error('Error fetching pie data:', error);
    res.status(500).json({ error: 'An error occurred while fetching pie data.' });
  }
};


