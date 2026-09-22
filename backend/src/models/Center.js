const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema(
  {
    centerName: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    city: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    state: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    courses: [
      {
        type: String,
        trim: true
      }
    ],
    trainingName: {
      type: String,
      trim: true,
      default: ''
    },
    pincode: {
      type: String,
      trim: true,
      default: ''
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    googleLocationUrl: {
      type: String,
      required: true,
      trim: true
    },
    contactPhone: {
      type: String,
      default: '8595887700',
      trim: true
    },
    contactPerson: {
      type: String,
      default: 'Center Incharge',
      trim: true
    },
    timing: {
      type: String,
      default: 'Mon - Sat: 9:00 AM - 5:30 PM',
      trim: true
    },
    images: [
      {
        type: String,
        trim: true
      }
    ],
    videos: [
      {
        title: { type: String, trim: true },
        url: { type: String, trim: true },
        thumbnail: { type: String, trim: true }
      }
    ],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Center', centerSchema);

