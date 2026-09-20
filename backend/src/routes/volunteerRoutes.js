const express = require('express');
const router = express.Router();
const { createVolunteer, getVolunteers } = require('../controllers/volunteerController');

router.route('/')
  .post(createVolunteer)
  .get(getVolunteers);

module.exports = router;
