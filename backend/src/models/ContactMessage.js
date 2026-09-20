const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    message: {
      type: String,
      trim: true
    },
    isResolved: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
