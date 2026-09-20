const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    trainingName: {
      type: String,
      required: true,
      trim: true,
      index: true
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
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Center', centerSchema);
