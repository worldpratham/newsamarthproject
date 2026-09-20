const Enrollment = require('../models/Enrollment');
const { isDbConnected, saveOffline } = require('../utils/saveSubmission');

// @desc    Submit student enrollment form (Popup 1022)
// @route   POST /api/enrollments
// @access  Public
exports.createEnrollment = async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      fatherName,
      motherName,
      phone,
      mobile,
      email,
      qualification,
      course,
      address,
      message
    } = req.body;

    const contactPhone = phone || mobile;

    if (!fullName || !dateOfBirth || !fatherName || !motherName || !contactPhone || !course || !address) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: Full Name, DOB, Father Name, Mother Name, Phone, Course, Address'
      });
    }

    const payload = {
      fullName,
      dateOfBirth,
      fatherName,
      motherName,
      phone: contactPhone,
      email: email || '',
      qualification: qualification || '',
      course,
      address,
      message: message || ''
    };

    let result;
    if (isDbConnected()) {
      result = await Enrollment.create(payload);
    } else {
      saveOffline('enrollments', payload);
      result = payload;
    }

    res.status(201).json({
      success: true,
      message: 'Student application submitted successfully! Our representative will contact you soon.',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while submitting application'
    });
  }
};

// @desc    Get all enrollments
// @route   GET /api/enrollments
// @access  Public / Admin
exports.getEnrollments = async (req, res) => {
  try {
    if (isDbConnected()) {
      const enrollments = await Enrollment.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: enrollments.length,
        data: enrollments
      });
    }

    // Offline fallback
    const fs = require('fs');
    const path = require('path');
    const offlineFile = path.join(__dirname, '../../data/offline_submissions.json');
    let list = [];
    if (fs.existsSync(offlineFile)) {
      const all = JSON.parse(fs.readFileSync(offlineFile, 'utf8') || '{}');
      list = all.enrollments || [];
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
