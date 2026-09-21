const Center = require('../models/Center');
const { isDbConnected } = require('../utils/saveSubmission');
const seedCenters = require('../seeds/centersData.json');

// @desc    Get all centers with optional state & training search filters
// @route   GET /api/centers
// @access  Public
exports.getCenters = async (req, res) => {
  try {
    const { state, search, training } = req.query;

    if (isDbConnected()) {
      const query = { isActive: true };

      if (state && state !== 'All') {
        query.state = new RegExp(`^${state}$`, 'i');
      }

      if (training && training !== 'All') {
        query.trainingName = new RegExp(training, 'i');
      }

      if (search) {
        query.$or = [
          { address: new RegExp(search, 'i') },
          { trainingName: new RegExp(search, 'i') },
          { state: new RegExp(search, 'i') },
          { pincode: new RegExp(search, 'i') }
        ];
      }

      const centers = await Center.find(query).sort({ _id: 1 });
      const states = await Center.distinct('state');
      const trainings = await Center.distinct('trainingName');

      return res.status(200).json({
        success: true,
        count: centers.length,
        states,
        trainings,
        data: centers
      });
    }

    // Offline fallback from seed data
    let centers = seedCenters;
    if (state && state !== 'All') {
      centers = centers.filter(c => c.state.toLowerCase() === state.toLowerCase());
    }
    if (training && training !== 'All') {
      centers = centers.filter(c => c.trainingName.toLowerCase().includes(training.toLowerCase()));
    }
    if (search) {
      const s = search.toLowerCase();
      centers = centers.filter(c =>
        (c.address && c.address.toLowerCase().includes(s)) ||
        (c.trainingName && c.trainingName.toLowerCase().includes(s)) ||
        (c.state && c.state.toLowerCase().includes(s)) ||
        (c.pincode && c.pincode.toLowerCase().includes(s))
      );
    }

    const states = [...new Set(seedCenters.map(c => c.state))].sort();
    const trainings = [...new Set(seedCenters.map(c => c.trainingName))].sort();

    res.status(200).json({
      success: true,
      count: centers.length,
      states,
      trainings,
      data: centers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new center
// @route   POST /api/centers
// @access  Admin
exports.createCenter = async (req, res) => {
  try {
    if (isDbConnected()) {
      const center = await Center.create(req.body);
      return res.status(201).json({
        success: true,
        data: center
      });
    }
    res.status(201).json({
      success: true,
      data: req.body,
      message: 'Center saved to memory (Offline mode)'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
