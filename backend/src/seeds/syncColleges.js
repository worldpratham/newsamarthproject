require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');
const College = require('../models/College');
const collegesList = require('./collegesData.json');

async function run() {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected!');

    await College.deleteMany({});
    await College.insertMany(collegesList);

    const count = await College.countDocuments();
    console.log('MongoDB College count after update:', count);

    await mongoose.disconnect();
    console.log('Done syncing colleges!');
  } catch (err) {
    console.error('Error syncing colleges:', err);
    process.exit(1);
  }
}

run();
