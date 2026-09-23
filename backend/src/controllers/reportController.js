const Report = require('../models/Report');

// @desc    Get all active reports (optionally filtered by ?type=yearly or ?type=monthly)
// @route   GET /api/reports
// @access  Public
exports.getReports = async (req, res) => {
  try {
    const filter = { isActive: true };
    if (req.query.type) {
      filter.type = req.query.type.toLowerCase();
    }
    if (req.query.year) {
      filter.year = req.query.year;
    }

    const reports = await Report.find(filter).sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching reports',
      error: error.message
    });
  }
};

// @desc    Get single report by ID
// @route   GET /api/reports/:id
// @access  Public
exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching report',
      error: error.message
    });
  }
};

// @desc    Create new report
// @route   POST /api/reports
// @access  Admin
exports.createReport = async (req, res) => {
  try {
    const report = await Report.create(req.body);
    res.status(201).json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create report',
      error: error.message
    });
  }
};

// @desc    Update report
// @route   PUT /api/reports/:id
// @access  Admin
exports.updateReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update report',
      error: error.message
    });
  }
};

// @desc    Delete report
// @route   DELETE /api/reports/:id
// @access  Admin
exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Report deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete report',
      error: error.message
    });
  }
};
