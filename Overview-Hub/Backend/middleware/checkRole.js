const RoleUsers = require('../models/RoleUsers'); // Import the RoleUsers schema

const checkRole = async (req, res, next) => {
  try {
    // Get the username from the request body
    const { username } = req.body;

    // Find the user in the RoleUsers collection
    const user = await RoleUsers.findOne({ username });

    // If the user is not found or is not an admin, send a forbidden error response
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // If the user is an admin, allow access to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = checkRole;
