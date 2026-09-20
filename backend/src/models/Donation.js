const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    amount: {
      type: Number,
      required: [true, 'Donation amount is required']
    },
    companyOrOrg: {
      type: String,
      trim: true
    },
    addressWithPin: {
      type: String,
      required: [true, 'Address with PIN is required'],
      trim: true
    },
    panNumber: {
      type: String,
      required: [true, 'PAN number is required for 80G tax exemption'],
      trim: true,
      uppercase: true
    },
    message: {
      type: String,
      trim: true
    },
    paymentStatus: {
      type: String,
      enum: ['initiated', 'confirmed', 'failed', 'pending'],
      default: 'initiated'
    },
    utrNumber: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Donation', donationSchema);
