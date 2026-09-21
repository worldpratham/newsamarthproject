const Donation = require('../models/Donation');
const { isDbConnected, saveOffline } = require('../utils/saveSubmission');

// @desc    Initiate donation / record donor info (Popup 955)
// @route   POST /api/donations
// @access  Public
exports.createDonation = async (req, res) => {
  try {
    const {
      fullName,
      name,
      phone,
      mobile,
      email,
      amount,
      panNumber,
      pan,
      companyOrOrg,
      organization,
      addressWithPin,
      address,
      message
    } = req.body;

    const donorName = (fullName || name || '').trim();
    let contactPhone = (phone || mobile || '').toString().replace(/\D/g, '');
    const cleanPan = (panNumber || pan || '').toString().trim().toUpperCase();
    const donorAddress = (addressWithPin || address || '').trim();
    const donorEmail = (email || '').trim().toLowerCase();
    const donationAmount = Number(amount);

    if (!donorName) {
      return res.status(400).json({ success: false, message: 'Please provide donor Full Name' });
    }

    if (!contactPhone || contactPhone.length !== 10) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit mobile number'
      });
    }

    if (donorEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      return res.status(400).json({ success: false, message: 'Please provide a valid donation amount' });
    }

    if (!cleanPan) {
      return res.status(400).json({
        success: false,
        message: 'PAN Number is required for 80G tax exemption receipt'
      });
    }

    if (!donorAddress) {
      return res.status(400).json({
        success: false,
        message: 'Address with PIN code is required for 80G tax exemption receipt'
      });
    }

    const payload = {
      fullName: donorName,
      phone: contactPhone,
      email: donorEmail,
      amount: donationAmount,
      panNumber: cleanPan,
      companyOrOrg: (companyOrOrg || organization || '').trim(),
      addressWithPin: donorAddress,
      message: (message || '').trim(),
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
      message: 'Donation request submitted successfully! Thank you for supporting Samarth Bharat.',
      data: result
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

// @desc    Update donation payment status
// @route   PATCH /api/donations/:id/status
// @access  Admin
exports.updateDonationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    const validStatuses = ['initiated', 'confirmed', 'failed', 'pending'];
    if (!validStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid paymentStatus. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    if (isDbConnected()) {
      const donation = await Donation.findByIdAndUpdate(
        id,
        { paymentStatus },
        { new: true, runValidators: true }
      );
      if (!donation) {
        return res.status(404).json({ success: false, message: 'Donation record not found' });
      }
      return res.status(200).json({ success: true, data: donation });
    }

    // Offline update
    const fs = require('fs');
    const path = require('path');
    const offlineFile = path.join(__dirname, '../../data/offline_submissions.json');
    if (fs.existsSync(offlineFile)) {
      const all = JSON.parse(fs.readFileSync(offlineFile, 'utf8') || '{}');
      if (all.donations && Array.isArray(all.donations)) {
        const item = all.donations.find((d, idx) => (d._id === id || String(idx) === id));
        if (item) item.paymentStatus = paymentStatus;
        fs.writeFileSync(offlineFile, JSON.stringify(all, null, 2));
      }
    }

    res.status(200).json({ success: true, data: { _id: id, paymentStatus } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete donation record
// @route   DELETE /api/donations/:id
// @access  Admin
exports.deleteDonation = async (req, res) => {
  try {
    const { id } = req.params;
    if (isDbConnected()) {
      const donation = await Donation.findByIdAndDelete(id);
      if (!donation) {
        return res.status(404).json({ success: false, message: 'Donation not found' });
      }
      return res.status(200).json({ success: true, message: 'Donation removed' });
    }

    res.status(200).json({ success: true, message: 'Donation removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

