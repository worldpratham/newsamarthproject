const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true
    },
    slug: {
      type: String,
      required: [true, 'Post slug is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    excerpt: {
      type: String,
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Post content is required']
    },
    link: {
      type: String
    },
    imageUrl: {
      type: String,
      default: 'https://samarthbharat.net/wp-content/uploads/2025/05/SB-About-img.jpg'
    },
    isPublished: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
