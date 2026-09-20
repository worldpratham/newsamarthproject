const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full Name is required'],
      trim: true
    },
    occupation: {
      type: String,
      trim: true
    },
    address: {
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
    department: {
      type: String,
      default: 'General',
      trim: true
    },
    message: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'onboarding'],
      default: 'onboarding'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Volunteer', volunteerSchema);
