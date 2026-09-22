const express = require('express');
const router = express.Router();
const { getCenters, getCenterById, createCenter } = require('../controllers/centerController');

router.route('/')
  .get(getCenters)
  .post(createCenter);

router.route('/:id')
  .get(getCenterById);

module.exports = router;
