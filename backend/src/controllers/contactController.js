const ContactMessage = require('../models/ContactMessage');
const { isDbConnected, saveOffline } = require('../utils/saveSubmission');

// @desc    Submit contact message
// @route   POST /api/contacts
// @access  Public
exports.createContactMessage = async (req, res) => {
  try {
    const { name, fullName, firstName, lastName, mobile, phone, email, subject, message } = req.body;
    const cName = (name || fullName || (firstName ? `${firstName} ${lastName || ''}`.trim() : '')).trim();
    const cPhone = (mobile || phone || '').toString().replace(/\D/g, '');
    const cEmail = (email || '').trim().toLowerCase();

    if (!cName || !cPhone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide Name and Contact Phone Number'
      });
    }

    if (cPhone.length !== 10) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit mobile number'
      });
    }

    if (cEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    const payload = {
      firstName: cName,
      lastName: subject || '',
      mobile: cPhone,
      email: cEmail,
      message: message || (subject ? `[Subject: ${subject}]` : ''),
      isResolved: false
    };

    let result;
    if (isDbConnected()) {
      result = await ContactMessage.create(payload);
    } else {
      saveOffline('contacts', payload);
      result = payload;
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been received! Our support team will get in touch shortly.',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while submitting message'
    });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contacts
// @access  Admin
exports.getContactMessages = async (req, res) => {
  try {
    if (isDbConnected()) {
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: messages.length,
        data: messages
      });
    }

    const fs = require('fs');
    const path = require('path');
    const offlineFile = path.join(__dirname, '../../data/offline_submissions.json');
    let list = [];
    if (fs.existsSync(offlineFile)) {
      const all = JSON.parse(fs.readFileSync(offlineFile, 'utf8') || '{}');
      list = all.contacts || [];
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
