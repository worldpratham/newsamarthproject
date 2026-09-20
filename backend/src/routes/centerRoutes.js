const express = require('express');
const router = express.Router();
const { getCenters, createCenter } = require('../controllers/centerController');

router.route('/')
  .get(getCenters)
  .post(createCenter);

module.exports = router;
