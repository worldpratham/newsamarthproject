const College = require('../models/College');
const { isDbConnected } = require('../utils/saveSubmission');
const seedColleges = require('../seeds/collegesData.json');

// @desc    Get all CDC DU colleges
// @route   GET /api/colleges
// @access  Public
exports.getColleges = async (req, res) => {
  try {
    if (isDbConnected()) {
      const colleges = await College.find({ isActive: true }).sort({ sNo: 1 });
      return res.status(200).json({
        success: true,
        count: colleges.length,
        data: colleges
      });
    }

    res.status(200).json({
      success: true,
      count: seedColleges.length,
      data: seedColleges
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
