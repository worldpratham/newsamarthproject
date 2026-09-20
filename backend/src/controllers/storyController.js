const Story = require('../models/Story');
const { isDbConnected } = require('../utils/saveSubmission');
const seedStories = require('../seeds/storiesData.json');

// @desc    Get all success stories
// @route   GET /api/stories
// @access  Public
exports.getStories = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category && req.query.category !== 'all') {
      filter.category = new RegExp(req.query.category, 'i');
    }

    if (isDbConnected()) {
      const stories = await Story.find(filter).sort({ _id: 1 });
      return res.status(200).json({
        success: true,
        count: stories.length,
        data: stories
      });
    }

    let data = seedStories;
    if (req.query.category && req.query.category !== 'all') {
      data = data.filter(s => s.category.toLowerCase().includes(req.query.category.toLowerCase()));
    }

    res.status(200).json({
      success: true,
      count: data.length,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single story by ID
// @route   GET /api/stories/:id
// @access  Public
exports.getStoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const story = await Story.findById(id);
      if (story) {
        return res.status(200).json({
          success: true,
          data: story
        });
      }
    }

    const story = seedStories.find(
      s => s._id === id || s.id === id || s.name.toLowerCase() === id.toLowerCase()
    );

    if (story) {
      return res.status(200).json({
        success: true,
        data: story
      });
    }

    res.status(404).json({
      success: false,
      message: 'Story not found'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
