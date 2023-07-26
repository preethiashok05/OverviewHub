const Clients = require('../../models/UserHandle/Clients');

const signup = async (req, res) => {
  try {
    console.log('hello');
    const { username, password ,isAdmin} = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const newUser = new Clients({
      username,
      password,
      isAdmin,
    });

    const savedUser = await newUser.save();

    res.status(200).json({ message: 'Signup successful', user: savedUser });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
   
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await Clients.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.json({ username: user.username, isAdmin: user.isAdmin });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { signup, signin };
