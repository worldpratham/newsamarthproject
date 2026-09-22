const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full Name is required'],
      trim: true
    },
    dateOfBirth: {
      type: Date,
      default: null
    },
    fatherName: {
      type: String,
      trim: true,
      default: ''
    },
    motherName: {
      type: String,
      trim: true,
      default: ''
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    qualification: {
      type: String,
      trim: true
    },
    course: {
      type: String,
      required: [true, 'Course selection is required'],
      trim: true
    },
    address: {
      type: String,
      required: [true, 'Full Address is required'],
      trim: true
    },
    message: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'enrolled', 'cancelled'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enrollment', enrollmentSchema);
