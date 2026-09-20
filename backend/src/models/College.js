const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema(
  {
    sNo: {
      type: Number,
      required: true
    },
    collegeName: {
      type: String,
      required: true,
      trim: true
    },
    university: {
      type: String,
      default: 'University of Delhi (DU)'
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('College', collegeSchema);
