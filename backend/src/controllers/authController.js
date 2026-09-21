const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isDbConnected } = require('../utils/saveSubmission');

const JWT_SECRET = process.env.JWT_SECRET || 'samarth_bharat_admin_secret_key_2026_secure';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

const DEFAULT_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@samarthbharat.org').toLowerCase();
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@123#2026';
const DEFAULT_ADMIN_NAME = process.env.ADMIN_NAME || 'Samarth Bharat Administrator';

const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

/**
 * Auto-seeds the default admin if no user exists in DB
 */
const ensureDefaultAdmin = async () => {
  if (!isDbConnected()) return null;
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      console.log('⚡ [Admin Auth]: Creating initial default administrator account...');
      const admin = await User.create({
        name: DEFAULT_ADMIN_NAME,
        email: DEFAULT_ADMIN_EMAIL,
        password: DEFAULT_ADMIN_PASSWORD,
        role: 'superadmin'
      });
      console.log(`✅ [Admin Auth]: Default admin created: ${DEFAULT_ADMIN_EMAIL}`);
      return admin;
    }
  } catch (err) {
    console.error('⚠️ [Admin Auth]: Error ensuring default admin:', err.message);
  }
  return null;
};

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. If DB is connected
    if (isDbConnected()) {
      await ensureDefaultAdmin();

      const user = await User.findOne({ email: cleanEmail }).select('+password');

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. User does not exist.'
        });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. Please check your password.'
        });
      }

      const token = signToken({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });

      return res.status(200).json({
        success: true,
        message: 'Login successful!',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    }

    // 2. Offline / Local fallback
    if (cleanEmail === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASSWORD) {
      const token = signToken({
        id: 'offline-admin-id',
        name: DEFAULT_ADMIN_NAME,
        email: DEFAULT_ADMIN_EMAIL,
        role: 'superadmin'
      });

      return res.status(200).json({
        success: true,
        message: 'Login successful (Offline Admin Mode)!',
        token,
        user: {
          id: 'offline-admin-id',
          name: DEFAULT_ADMIN_NAME,
          email: DEFAULT_ADMIN_EMAIL,
          role: 'superadmin'
        }
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid credentials.'
    });
  } catch (error) {
    console.error('[Admin Login Error]:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during login.'
    });
  }
};

// @desc    Get currently logged-in admin
// @route   GET /api/auth/me
// @access  Private (Admin)
exports.getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
