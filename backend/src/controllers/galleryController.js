const Gallery = require('../models/Gallery');
const { isDbConnected, saveOffline } = require('../utils/saveSubmission');
const seedGallery = require('../seeds/galleryData.json');

// @desc    Get all gallery items (supports optional ?category= filter)
// @route   GET /api/gallery
// @access  Public
exports.getGalleryItems = async (req, res) => {
  try {
    const filter = { isActive: { $ne: false } };
    if (req.query.category && req.query.category.toLowerCase() !== 'all') {
      filter.category = new RegExp(`^${req.query.category.trim()}$`, 'i');
    }

    if (isDbConnected()) {
      const items = await Gallery.find(filter).sort({ order: 1, createdAt: -1, _id: 1 });
      return res.status(200).json({
        success: true,
        count: items.length,
        data: items
      });
    }

    // Fallback if MongoDB is temporarily offline
    let data = seedGallery;
    if (req.query.category && req.query.category.toLowerCase() !== 'all') {
      const catLower = req.query.category.trim().toLowerCase();
      data = data.filter(item => (item.category || '').toLowerCase() === catLower);
    }

    res.status(200).json({
      success: true,
      count: data.length,
      data: data
    });
  } catch (error) {
    console.error('[Gallery Controller Error]:', error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single gallery item by ID
// @route   GET /api/gallery/:id
// @access  Public
exports.getGalleryItemById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const item = await Gallery.findById(id);
      if (item) {
        return res.status(200).json({
          success: true,
          data: item
        });
      }
    }

    const item = seedGallery.find(
      g => String(g._id) === id || String(g.id) === id || String(g.order) === id
    );

    if (item) {
      return res.status(200).json({
        success: true,
        data: item
      });
    }

    res.status(404).json({
      success: false,
      message: 'Gallery item not found'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new gallery item
// @route   POST /api/gallery
// @access  Public / Admin
exports.createGalleryItem = async (req, res) => {
  try {
    const { title, category, image, wpImage, order } = req.body;

    if (!title || !image) {
      return res.status(400).json({
        success: false,
        message: 'Title and image are required fields'
      });
    }

    const payload = {
      title: title.trim(),
      category: category ? category.trim() : 'Training',
      image: image.trim(),
      wpImage: wpImage ? wpImage.trim() : image.trim(),
      order: Number(order) || 0,
      isActive: true
    };

    if (isDbConnected()) {
      const created = await Gallery.create(payload);
      return res.status(201).json({
        success: true,
        data: created,
        message: 'Gallery item created successfully'
      });
    }

    saveOffline('gallery', payload);
    return res.status(201).json({
      success: true,
      data: payload,
      message: 'Gallery item saved offline (will sync when DB is connected)'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
// @access  Public / Admin
exports.updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database is not connected, cannot update'
      });
    }

    const updated = await Gallery.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: updated,
      message: 'Gallery item updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Public / Admin
exports.deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database is not connected, cannot delete'
      });
    }

    const deleted = await Gallery.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Gallery item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
