const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/samarth_bharat');
    console.log(`[MongoDB Connected]: ${conn.connection.host} | DB: ${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    // Don't exit immediately in dev so app can still serve cached/seed data if mongo isn't running locally yet
  }
};

module.exports = connectDB;
