const express = require('express');
const router = express.Router();
const {
  createEnrollment,
  getEnrollments,
  updateEnrollmentStatus,
  deleteEnrollment
} = require('../controllers/enrollmentController');

router.route('/')
  .post(createEnrollment)
  .get(getEnrollments);

router.route('/:id/status')
  .patch(updateEnrollmentStatus);

router.route('/:id')
  .delete(deleteEnrollment);

module.exports = router;

