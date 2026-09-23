require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');
const Gallery = require('../models/Gallery');
const galleryItems = require('./galleryData.json');

const syncGallery = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/samarth_bharat';
    console.log(`Connecting to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully.');

    console.log('Checking existing gallery items in database...');
    const count = await Gallery.countDocuments();
    console.log(`Current Gallery count in DB: ${count}`);

    console.log('Clearing old gallery items and re-seeding with fresh data...');
    await Gallery.deleteMany({});
    const inserted = await Gallery.insertMany(galleryItems);
    console.log(`✅ Successfully seeded ${inserted.length} Gallery items in MongoDB!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error syncing gallery items:', error.message);
    process.exit(1);
  }
};

syncGallery();
