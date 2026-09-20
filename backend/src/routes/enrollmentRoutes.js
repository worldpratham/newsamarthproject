const express = require('express');
const router = express.Router();
const { createEnrollment, getEnrollments } = require('../controllers/enrollmentController');

router.route('/')
  .post(createEnrollment)
  .get(getEnrollments);

module.exports = router;
