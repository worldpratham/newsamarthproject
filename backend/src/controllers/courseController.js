const Course = require('../models/Course');
const { isDbConnected } = require('../utils/saveSubmission');
const seedCourses = require('../seeds/coursesData.json');

// @desc    Get all courses with optional category or isCDC filter
// @route   GET /api/courses
// @access  Public
exports.getCourses = async (req, res) => {
  try {
    const { category, isCDC } = req.query;
    const isCdcFilter = isCDC === 'true' || isCDC === true || (category && category.toLowerCase() === 'cdc');

    if (isDbConnected()) {
      const query = { isActive: true };

      if (isCdcFilter) {
        query.$or = [
          { isCDC: true },
          { category: 'Career Development Centre (CDC)' }
        ];
      } else if (category && category !== 'All') {
        query.category = category;
      }

      const courses = await Course.find(query).sort({ order: 1, createdAt: 1, title: 1 });
      return res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
      });
    }

    let courses = seedCourses;
    if (isCdcFilter) {
      courses = courses.filter(c => c.isCDC || c.category === 'Career Development Centre (CDC)');
    } else if (category && category !== 'All') {
      courses = courses.filter(c => c.category.toLowerCase() === category.toLowerCase());
    }

    courses.sort((a, b) => (a.order || 99) - (b.order || 99));

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single course by slug
// @route   GET /api/courses/:slug
// @access  Public
exports.getCourseBySlug = async (req, res) => {
  try {
    let { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ success: false, message: 'Slug is required' });
    }
    slug = slug.replace(/^\/+|\/+$/g, '').toLowerCase();
    const altSlug = slug.endsWith('-course') ? slug.replace(/-course$/, '') : `${slug}-course`;

    if (isDbConnected()) {
      const course = await Course.findOne({
        $or: [
          { slug: slug },
          { slug: altSlug },
          { slug: new RegExp(`^${slug}$`, 'i') },
          { slug: new RegExp(`^${altSlug}$`, 'i') }
        ]
      });
      if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
      }
      return res.status(200).json({ success: true, data: course });
    }

    const course = seedCourses.find(c => {
      const cSlug = (c.slug || '').toLowerCase();
      return cSlug === slug || cSlug === altSlug || cSlug.includes(slug) || slug.includes(cSlug);
    });
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new course
// @route   POST /api/courses
// @access  Public (or Admin)
exports.createCourse = async (req, res) => {
  try {
    const courseData = req.body;
    if (!courseData.title || !courseData.slug) {
      return res.status(400).json({ success: false, message: 'Title and slug are required' });
    }
    courseData.slug = courseData.slug.replace(/^\/+|\/+$/g, '').toLowerCase();

    if (isDbConnected()) {
      const existing = await Course.findOne({ slug: courseData.slug });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Course with this slug already exists' });
      }
      const course = await Course.create(courseData);
      return res.status(201).json({ success: true, data: course });
    }

    res.status(201).json({ success: true, data: courseData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update course by id or slug
// @route   PUT /api/courses/:id
// @access  Public (or Admin)
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (isDbConnected()) {
      let course;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        course = await Course.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      } else {
        const cleanSlug = id.replace(/^\/+|\/+$/g, '').toLowerCase();
        course = await Course.findOneAndUpdate({ slug: cleanSlug }, updateData, { new: true, runValidators: true });
      }

      if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
      }
      return res.status(200).json({ success: true, data: course });
    }

    res.status(200).json({ success: true, data: updateData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete course by id
// @route   DELETE /api/courses/:id
// @access  Public (or Admin)
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    if (isDbConnected()) {
      let course;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        course = await Course.findByIdAndDelete(id);
      } else {
        course = await Course.findOneAndDelete({ slug: id });
      }
      if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
      }
      return res.status(200).json({ success: true, message: 'Course deleted successfully' });
    }
    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
