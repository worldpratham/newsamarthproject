const express = require('express');
const router = express.Router();
const {
  createDonation,
  getDonations,
  updateDonationStatus,
  deleteDonation
} = require('../controllers/donationController');

router.route('/')
  .post(createDonation)
  .get(getDonations);

router.route('/:id/status')
  .patch(updateDonationStatus);

router.route('/:id')
  .delete(deleteDonation);

module.exports = router;

