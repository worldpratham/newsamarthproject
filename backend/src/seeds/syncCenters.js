require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');
const Center = require('../models/Center');
const cleanCenters = require('./centersData.json');

async function run() {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected!');

    const countBefore = await Center.countDocuments();
    console.log('Count before update:', countBefore);

    console.log('Removing old centers...');
    await Center.deleteMany({});

    console.log(`Inserting ${cleanCenters.length} centers with pincodes...`);
    await Center.insertMany(cleanCenters);

    const countAfter = await Center.countDocuments();
    console.log('Count after update:', countAfter);

    const sample = await Center.findOne();
    console.log('Sample updated record:', sample);

    await mongoose.disconnect();
    console.log('Done!');
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  }
}

run();
