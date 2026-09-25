const Center = require('../models/Center');
const { isDbConnected } = require('../utils/saveSubmission');
const seedCenters = require('../seeds/centersData.json');

// Helper to auto-seed/update MongoDB centers if empty or outdated
async function ensureDbCentersSynced() {
  if (!isDbConnected()) return;
  try {
    const count = await Center.countDocuments();
    // If no centers or old schema without images
    const sample = await Center.findOne({ images: { $exists: true, $ne: [] } });
    const hasOutdatedData = await Center.findOne({ centerName: /JIND/i, city: 'Delhi' });
    if (count !== seedCenters.length || !sample || hasOutdatedData) {
      console.log(`🔄 [Centers]: Seeding/updating centers in MongoDB with all ${seedCenters.length} centers...`);
      await Center.deleteMany({});
      await Center.insertMany(seedCenters);
      console.log(`✅ [Centers]: Successfully seeded ${seedCenters.length} centers in MongoDB!`);
    }
  } catch (err) {
    console.warn('[Centers]: Auto-sync warning:', err.message);
  }
}

// @desc    Get all centers with city, course, and keyword search filters
// @route   GET /api/centers
// @access  Public
exports.getCenters = async (req, res) => {
  try {
    const { city, course, training, state, search, centerId } = req.query;
    const courseFilter = course || training;

    if (isDbConnected()) {
      await ensureDbCentersSynced();

      const query = { isActive: true };

      if (centerId) {
        query._id = centerId;
      }

      if (city && city !== 'All') {
        query.city = new RegExp(`^${city}$`, 'i');
      }

      if (state && state !== 'All') {
        query.state = new RegExp(`^${state}$`, 'i');
      }

      if (courseFilter && courseFilter !== 'All') {
        query.$or = [
          { courses: new RegExp(courseFilter, 'i') },
          { trainingName: new RegExp(courseFilter, 'i') }
        ];
      }

      if (search) {
        const sReg = new RegExp(search.trim(), 'i');
        query.$or = [
          { centerName: sReg },
          { address: sReg },
          { city: sReg },
          { state: sReg },
          { pincode: sReg },
          { courses: sReg },
          { trainingName: sReg }
        ];
      }

      const centers = await Center.find(query).sort({ centerName: 1, _id: 1 });
      const rawCenters = await Center.find({ isActive: true }).select('city state courses trainingName');

      const cities = [...new Set(rawCenters.map(c => c.city).filter(Boolean))].sort();
      const states = [...new Set(rawCenters.map(c => c.state).filter(Boolean))].sort();
      const coursesSet = new Set();
      const cityCounts = {};
      const courseCounts = {};

      rawCenters.forEach(c => {
        if (c.city) cityCounts[c.city] = (cityCounts[c.city] || 0) + 1;
        if (Array.isArray(c.courses)) {
          c.courses.forEach(crs => {
            coursesSet.add(crs);
            courseCounts[crs] = (courseCounts[crs] || 0) + 1;
          });
        }
        if (c.trainingName) {
          c.trainingName.split(',').forEach(crs => {
            const trimmed = crs.trim();
            coursesSet.add(trimmed);
            if (!Array.isArray(c.courses) || !c.courses.includes(trimmed)) {
              courseCounts[trimmed] = (courseCounts[trimmed] || 0) + 1;
            }
          });
        }
      });
      const courses = [...coursesSet].filter(Boolean).sort();

      return res.status(200).json({
        success: true,
        count: centers.length,
        total: rawCenters.length,
        cities,
        courses,
        states,
        cityCounts,
        courseCounts,
        data: centers
      });
    }

    // Offline fallback from seed data
    let centers = seedCenters;

    if (centerId) {
      centers = centers.filter(c => (c._id && c._id === centerId) || c.centerName === centerId);
    }

    if (city && city !== 'All') {
      centers = centers.filter(c => c.city && c.city.toLowerCase() === city.toLowerCase());
    }

    if (state && state !== 'All') {
      centers = centers.filter(c => c.state && c.state.toLowerCase() === state.toLowerCase());
    }

    if (courseFilter && courseFilter !== 'All') {
      const cLower = courseFilter.toLowerCase();
      centers = centers.filter(c =>
        (Array.isArray(c.courses) && c.courses.some(crs => crs.toLowerCase().includes(cLower))) ||
        (c.trainingName && c.trainingName.toLowerCase().includes(cLower))
      );
    }

    if (search) {
      const s = search.toLowerCase().trim();
      centers = centers.filter(c =>
        (c.centerName && c.centerName.toLowerCase().includes(s)) ||
        (c.city && c.city.toLowerCase().includes(s)) ||
        (c.address && c.address.toLowerCase().includes(s)) ||
        (c.state && c.state.toLowerCase().includes(s)) ||
        (c.pincode && c.pincode.toLowerCase().includes(s)) ||
        (Array.isArray(c.courses) && c.courses.some(crs => crs.toLowerCase().includes(s))) ||
        (c.trainingName && c.trainingName.toLowerCase().includes(s))
      );
    }

    const cities = [...new Set(seedCenters.map(c => c.city).filter(Boolean))].sort();
    const states = [...new Set(seedCenters.map(c => c.state).filter(Boolean))].sort();
    const coursesSet = new Set();
    const cityCounts = {};
    const courseCounts = {};
    seedCenters.forEach(c => {
      if (c.city) cityCounts[c.city] = (cityCounts[c.city] || 0) + 1;
      if (Array.isArray(c.courses)) {
        c.courses.forEach(crs => {
          coursesSet.add(crs);
          courseCounts[crs] = (courseCounts[crs] || 0) + 1;
        });
      }
      if (c.trainingName) {
        c.trainingName.split(',').forEach(crs => {
          const trimmed = crs.trim();
          coursesSet.add(trimmed);
          if (!Array.isArray(c.courses) || !c.courses.includes(trimmed)) {
            courseCounts[trimmed] = (courseCounts[trimmed] || 0) + 1;
          }
        });
      }
    });
    const courses = [...coursesSet].filter(Boolean).sort();

    res.status(200).json({
      success: true,
      count: centers.length,
      total: seedCenters.length,
      cities,
      courses,
      states,
      cityCounts,
      courseCounts,
      data: centers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single center by ID
// @route   GET /api/centers/:id
// @access  Public
exports.getCenterById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const center = await Center.findById(id);
      if (center) {
        return res.status(200).json({ success: true, data: center });
      }
    }

    const fallback = seedCenters.find(c => c._id === id || c.centerName === id || c.pincode === id);
    if (fallback) {
      return res.status(200).json({ success: true, data: fallback });
    }

    res.status(404).json({ success: false, message: 'Center not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
      message: 'Center saved in memory (Offline mode)'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

