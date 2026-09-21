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

// @desc    Update enrollment status
// @route   PATCH /api/enrollments/:id/status
// @access  Admin
exports.updateEnrollmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'contacted', 'enrolled', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    if (isDbConnected()) {
      const enrollment = await Enrollment.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );
      if (!enrollment) {
        return res.status(404).json({ success: false, message: 'Enrollment not found' });
      }
      return res.status(200).json({ success: true, data: enrollment });
    }

    // Offline fallback update
    const fs = require('fs');
    const path = require('path');
    const offlineFile = path.join(__dirname, '../../data/offline_submissions.json');
    if (fs.existsSync(offlineFile)) {
      const all = JSON.parse(fs.readFileSync(offlineFile, 'utf8') || '{}');
      if (all.enrollments && Array.isArray(all.enrollments)) {
        const item = all.enrollments.find((e, idx) => (e._id === id || String(idx) === id));
        if (item) item.status = status;
        fs.writeFileSync(offlineFile, JSON.stringify(all, null, 2));
      }
    }

    res.status(200).json({ success: true, data: { _id: id, status } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete enrollment
// @route   DELETE /api/enrollments/:id
// @access  Admin
exports.deleteEnrollment = async (req, res) => {
  try {
    const { id } = req.params;
    if (isDbConnected()) {
      const enrollment = await Enrollment.findByIdAndDelete(id);
      if (!enrollment) {
        return res.status(404).json({ success: false, message: 'Enrollment not found' });
      }
      return res.status(200).json({ success: true, message: 'Enrollment removed' });
    }

    // Offline fallback delete
    const fs = require('fs');
    const path = require('path');
    const offlineFile = path.join(__dirname, '../../data/offline_submissions.json');
    if (fs.existsSync(offlineFile)) {
      const all = JSON.parse(fs.readFileSync(offlineFile, 'utf8') || '{}');
      if (all.enrollments) {
        all.enrollments = all.enrollments.filter((e, idx) => e._id !== id && String(idx) !== id);
        fs.writeFileSync(offlineFile, JSON.stringify(all, null, 2));
      }
    }

    res.status(200).json({ success: true, message: 'Enrollment removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

