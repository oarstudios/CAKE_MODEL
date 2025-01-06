const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const requireAuth = (requiredUserType) => async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'You must be logged in to access this route' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.SECRET);

    // Find the user from the token
    console.log(decoded)
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Check if the user's type matches the required type
    if (user.userType !== requiredUserType) {
      return res.status(403).json({ error: 'Access denied' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = requireAuth;
