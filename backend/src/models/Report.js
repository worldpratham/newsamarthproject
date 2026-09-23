const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ['yearly', 'monthly'],
      required: true,
      default: 'monthly'
    },
    url: {
      type: String,
      trim: true,
      default: ''
    },
    year: {
      type: String,
      trim: true
    },
    isYearHeader: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
