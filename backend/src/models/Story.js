const mongoose = require('mongoose');

const storySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    companyOrCenter: {
      type: String,
      trim: true
    },
    storyText: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String
    },
    category: {
      type: String,
      trim: true
    },
    impact: {
      type: String,
      trim: true
    },
    isFeatured: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Story', storySchema);
