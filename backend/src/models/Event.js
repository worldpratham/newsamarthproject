const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
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
    content: {
      type: String,
      required: true
    },
    excerpt: {
      type: String
    },
    category: {
      type: String,
      default: 'Events & Activities'
    },
    eventDate: {
      type: Date
    },
    venue: {
      type: String
    },
    featuredImage: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
