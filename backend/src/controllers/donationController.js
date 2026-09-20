const Donation = require('../models/Donation');
const { isDbConnected, saveOffline } = require('../utils/saveSubmission');

// @desc    Initiate donation / record donor info (Popup 955)
// @route   POST /api/donations
// @access  Public
exports.createDonation = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      mobile,
      email,
      amount,
      panNumber,
      companyOrOrg,
      addressWithPin,
      message
    } = req.body;

    const contactPhone = phone || mobile;

    if (!fullName || !contactPhone || !amount || !panNumber || !addressWithPin) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: Full Name, Phone, Amount, PAN Number, Address with PIN'
      });
    }

    const payload = {
      fullName,
      phone: contactPhone,
      email: email || '',
      amount: Number(amount),
      panNumber: panNumber.toUpperCase(),
      companyOrOrg: companyOrOrg || '',
      addressWithPin,
      message: message || '',
      paymentStatus: 'pending'
    };

    let result;
    if (isDbConnected()) {
      result = await Donation.create(payload);
    } else {
      saveOffline('donations', payload);
      result = payload;
    }

    res.status(201).json({
      success: true,
      message: 'Donation details recorded successfully. Proceed to scan QR code.',
      data: result,
      redirectUrl: '/donate-now.html'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while recording donation'
    });
  }
};

// @desc    Get all donations
// @route   GET /api/donations
// @access  Admin
exports.getDonations = async (req, res) => {
  try {
    if (isDbConnected()) {
      const donations = await Donation.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: donations.length,
        data: donations
      });
    }

    const fs = require('fs');
    const path = require('path');
    const offlineFile = path.join(__dirname, '../../data/offline_submissions.json');
    let list = [];
    if (fs.existsSync(offlineFile)) {
      const all = JSON.parse(fs.readFileSync(offlineFile, 'utf8') || '{}');
      list = all.donations || [];
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
