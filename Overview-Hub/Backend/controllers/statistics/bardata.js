const { BarData }  = require('../../models/Statistics/BarData'); 

exports.addBarData = async (req, res) => {
  try{
    const { country, hotDog, burger, kebab,  donut,  others } = req.body; // Assuming the request body contains all the required fields

    const newBarData = new BarData({
      country: country,
      hotDog: hotDog,
      burger: burger,
      kebab: kebab,
      donut: donut,
      others: others,
    });
  
    await newBarData.save();
    res.status(201).json({ message: 'BarData added successfully.' });
  }catch(error){
   console.error('Error saving data:', error);
   res.status(500).json({ error: 'An error occurred while saving the data.' });
  }
};

exports.getBarData = async (req, res) => {
  try {
    const barData = await BarData.find();
    res.status(200).json(barData);
  } catch (error) {
    console.error('Error fetching bar data:', error);
    res.status(500).json({ error: 'An error occurred while fetching pie data.' });
  }
};

