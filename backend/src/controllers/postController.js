const Post = require('../models/Post');
const { isDbConnected } = require('../utils/saveSubmission');
const seedPosts = require('../seeds/postsData.json');

// @desc    Get all blog posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    if (isDbConnected()) {
      const total = await Post.countDocuments({ isPublished: true });
      const posts = await Post.find({ isPublished: true })
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit);

      return res.status(200).json({
        success: true,
        count: posts.length,
        total,
        page,
        pages: Math.ceil(total / limit),
        data: posts
      });
    }

    // Offline fallback from seedPosts
    const total = seedPosts.length;
    const paginated = seedPosts.slice(skip, skip + limit);

    res.status(200).json({
      success: true,
      count: paginated.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: paginated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single blog post by slug
// @route   GET /api/posts/:slug
// @access  Public
exports.getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (isDbConnected()) {
      const post = await Post.findOne({ slug });
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
      return res.status(200).json({ success: true, data: post });
    }

    const post = seedPosts.find(p => p.slug === slug || p.slug.includes(slug));
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
