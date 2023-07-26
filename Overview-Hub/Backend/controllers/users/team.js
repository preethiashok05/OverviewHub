const { Team } = require('../../models/UserHandle/Team'); 

exports.addTeam = (req, res) => {
  const { email, access } = req.body; 

  const newTeam = new Team({
    email: email,
    access: access,
  });

  newTeam.save((err) => {
    if (err) {
      console.error('Error saving team:', err);
      res.status(500).json({ error: 'An error occurred while saving the team.' });
    } else {
      res.status(201).json({ message: 'Team added successfully.' });
    }
  });
};

exports.getData = async (req, res) => {
  try {
    const data = await Team.find();
    res.status(200).json(data);
    
  } catch (error) {
    console.error('Error fetching pie data:', error);
    res.status(500).json({ error: 'An error occurred while fetching pie data.' });
  }
};

