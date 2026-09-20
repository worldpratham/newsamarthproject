const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    category: {
      type: String,
      enum: ['Community', 'Career Development Centre (CDC)', 'Technical', 'Vocational'],
      default: 'Community'
    },
    duration: {
      type: String,
      required: true
    },
    language: {
      type: String,
      default: 'Hindi'
    },
    certification: {
      type: String,
      default: 'BDSN / KVIC'
    },
    overview: {
      type: String,
      required: true
    },
    eligibility: {
      type: String,
      default: 'Open to youth and individuals looking for employment or self-employment'
    },
    modules: [
      {
        moduleNumber: Number,
        title: String,
        description: String
      }
    ],
    imageUrl: {
      type: String
    },
    isCDC: {
      type: Boolean,
      default: false,
      index: true
    },
    order: {
      type: Number,
      default: 99
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
