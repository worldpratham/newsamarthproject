const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

router.route('/')
  .get(getCourses)
  .post(createCourse);

router.route('/:slug')
  .get(getCourseBySlug);

router.route('/:id')
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
