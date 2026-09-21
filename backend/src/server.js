require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');

// Initialize database connection
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Serve Frontend static files (with automatic .html extension resolution)
app.use(express.static(path.join(__dirname, '../../frontend'), {
  extensions: ['html', 'htm']
}));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/enrollments', require('./routes/enrollmentRoutes'));
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/volunteers', require('./routes/volunteerRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/centers', require('./routes/centerRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/colleges', require('./routes/collegeRoutes'));
app.use('/api/stories', require('./routes/storyRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Samarth Bharat API Server is running smoothly!',
    timestamp: new Date().toISOString()
  });
});

// Fallback for SPA/MPA routes to frontend index (local dev only)
if (!process.env.VERCEL) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 [Samarth Bharat Server]: Running on http://localhost:${PORT}`);
  });
}

module.exports = app;
