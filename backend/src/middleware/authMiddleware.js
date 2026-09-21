const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isDbConnected } = require('../utils/saveSubmission');

const JWT_SECRET = process.env.JWT_SECRET || 'samarth_bharat_admin_secret_key_2026_secure';

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. Please log in.'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (isDbConnected()) {
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists.'
        });
      }
      req.user = user;
    } else {
      // Offline fallback support
      req.user = {
        id: decoded.id,
        name: decoded.name || 'Samarth Bharat Admin',
        email: decoded.email || 'admin@samarthbharat.org',
        role: decoded.role || 'admin'
      };
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token is invalid or expired. Please log in again.'
    });
  }
};
