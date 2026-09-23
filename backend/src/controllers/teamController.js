const TeamMember = require('../models/TeamMember');

// @desc    Get all active team members
// @route   GET /api/team
// @access  Public
exports.getTeamMembers = async (req, res) => {
  try {
    const filter = { isActive: true };
    const members = await TeamMember.find(filter).sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      count: members.length,
      data: members
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching team members',
      error: error.message
    });
  }
};

// @desc    Get single team member
// @route   GET /api/team/:id
// @access  Public
exports.getTeamMemberById = async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.status(200).json({
      success: true,
      data: member
    });
  } catch (error) {
    console.error('Error fetching team member:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching team member',
      error: error.message
    });
  }
};

// @desc    Create new team member
// @route   POST /api/team
// @access  Admin
exports.createTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.create(req.body);
    res.status(201).json({
      success: true,
      data: member
    });
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create team member',
      error: error.message
    });
  }
};

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Admin
exports.updateTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.status(200).json({
      success: true,
      data: member
    });
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update team member',
      error: error.message
    });
  }
};

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Admin
exports.deleteTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team member removed successfully'
    });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete team member',
      error: error.message
    });
  }
};
