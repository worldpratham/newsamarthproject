require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');
const Report = require('../models/Report');
const reportItems = require('./reportData.json');

const syncReports = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/samarth_bharat';
    console.log(`Connecting to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully.');

    console.log('Clearing old reports and re-seeding with fresh data...');
    await Report.deleteMany({});
    const inserted = await Report.insertMany(reportItems);
    console.log(`✅ Successfully seeded ${inserted.length} Reports (Yearly & Monthly) in MongoDB!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error syncing reports:', error.message);
    process.exit(1);
  }
};

syncReports();
