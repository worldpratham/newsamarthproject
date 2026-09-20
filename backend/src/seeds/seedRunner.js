require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Center = require('../models/Center');
const Course = require('../models/Course');
const College = require('../models/College');
const Story = require('../models/Story');
const Post = require('../models/Post');
const Enrollment = require('../models/Enrollment');
const Donation = require('../models/Donation');
const Volunteer = require('../models/Volunteer');
const ContactMessage = require('../models/ContactMessage');

const centers = require('./centersData.json');
const courses = require('./coursesData.json');
const colleges = require('./collegesData.json');
const stories = require('./storiesData.json');
const posts = require('./postsData.json');

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/samarth_bharat';
    console.log(`Connecting to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully.');

    // Clear existing data
    console.log('Clearing old collections...');
    await Promise.all([
      Center.deleteMany({}),
      Course.deleteMany({}),
      College.deleteMany({}),
      Story.deleteMany({}),
      Post.deleteMany({})
    ]);

    // Insert seeds
    console.log(`Inserting ${centers.length} Centers...`);
    await Center.insertMany(centers);

    console.log(`Inserting ${courses.length} Courses...`);
    await Course.insertMany(courses);

    console.log(`Inserting ${colleges.length} Colleges...`);
    await College.insertMany(colleges);

    console.log(`Inserting ${stories.length} Stories...`);
    await Story.insertMany(stories);

    console.log(`Inserting ${posts.length} Blog Posts...`);
    await Post.insertMany(posts);

    // Sync any offline submissions if they exist
    const offlineFile = path.join(__dirname, '../../data/offline_submissions.json');
    if (fs.existsSync(offlineFile)) {
      const offline = JSON.parse(fs.readFileSync(offlineFile, 'utf8') || '{}');
      if (offline.enrollments && offline.enrollments.length) {
        console.log(`Syncing ${offline.enrollments.length} offline enrollments...`);
        const clean = offline.enrollments.map(({ _id, ...rest }) => rest);
        await Enrollment.insertMany(clean);
      }
      if (offline.donations && offline.donations.length) {
        console.log(`Syncing ${offline.donations.length} offline donations...`);
        const clean = offline.donations.map(({ _id, ...rest }) => rest);
        await Donation.insertMany(clean);
      }
      if (offline.volunteers && offline.volunteers.length) {
        console.log(`Syncing ${offline.volunteers.length} offline volunteers...`);
        const clean = offline.volunteers.map(({ _id, ...rest }) => rest);
        await Volunteer.insertMany(clean);
      }
      if (offline.contacts && offline.contacts.length) {
        console.log(`Syncing ${offline.contacts.length} offline contacts...`);
        const clean = offline.contacts.map(({ _id, ...rest }) => rest);
        await ContactMessage.insertMany(clean);
      }
    }

    console.log('✅ Database seeded successfully with all Samarth Bharat data in MongoDB!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error.message);
    process.exit(1);
  }
};

seedDatabase();
