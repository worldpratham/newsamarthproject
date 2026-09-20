const Volunteer = require('../models/Volunteer');
const { isDbConnected, saveOffline } = require('../utils/saveSubmission');

// @desc    Register new volunteer
// @route   POST /api/volunteers
// @access  Public
exports.createVolunteer = async (req, res) => {
  try {
    const { fullName, name, occupation, address, mobile, phone, email, department, message } = req.body;
    const vName = fullName || name;
    const vPhone = mobile || phone;

    if (!vName || !vPhone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide Full Name and Mobile Number'
      });
    }

    const payload = {
      fullName: vName,
      occupation: occupation || '',
      address: address || '',
      mobile: vPhone,
      email: email || '',
      department: department || 'General',
      message: message || '',
      status: 'onboarding'
    };

    let result;
    if (isDbConnected()) {
      result = await Volunteer.create(payload);
    } else {
      saveOffline('volunteers', payload);
      result = payload;
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for volunteering! Our coordinator will contact you shortly.',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while registering volunteer'
    });
  }
};

// @desc    Get all volunteers
// @route   GET /api/volunteers
// @access  Public / Admin
exports.getVolunteers = async (req, res) => {
  try {
    if (isDbConnected()) {
      const volunteers = await Volunteer.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: volunteers.length,
        data: volunteers
      });
    }

    const fs = require('fs');
    const path = require('path');
    const offlineFile = path.join(__dirname, '../../data/offline_submissions.json');
    let list = [];
    if (fs.existsSync(offlineFile)) {
      const all = JSON.parse(fs.readFileSync(offlineFile, 'utf8') || '{}');
      list = all.volunteers || [];
    }

    res.status(200).json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
