const { User } = require('../../models/UserHandle/Users'); 

exports.addUser = async (req, res) => {
  try {
    console.log(req.body);
    const {  name, email, age, phone, address, city, zipcode } = req.body; // Assuming the request body contains all the required fields
    const id = -1;
    const newUser = new User({
      id:id,
      name: name,
      email: email,
      age: age,
      phone: phone,
      address: address,
      city: city,
      zipCode: zipcode,
    });
  
    await newUser.save();

    console.log('item saved');
    res.status(201).json({ message: 'User added successfully.' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'An error occurred while saving the user.' });
  }
};

exports.getUsersData = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
    
  } catch (error) {
    console.error('Error fetching pie data:', error);
    res.status(500).json({ error: 'An error occurred while fetching pie data.' });
  }
};