require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');
const TeamMember = require('../models/TeamMember');
const teamMembers = require('./teamData.json');

const syncTeam = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/samarth_bharat';
    console.log(`Connecting to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully.');

    console.log('Clearing old team members and re-seeding with fresh data...');
    await TeamMember.deleteMany({});
    const inserted = await TeamMember.insertMany(teamMembers);
    console.log(`✅ Successfully seeded ${inserted.length} Team Members in MongoDB!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error syncing team members:', error.message);
    process.exit(1);
  }
};

syncTeam();
