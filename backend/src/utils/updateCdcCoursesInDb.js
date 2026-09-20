require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');
const Course = require('../models/Course');

const cdcConfig = [
  {
    slug: 'video-editing-course',
    order: 1,
    isCDC: true,
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/SB-Video-Editing-Course-2.jpg',
  },
  {
    slug: 'ai-prompt-engineering',
    order: 2,
    isCDC: true,
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/AI-promp-engineering.jpg',
  },
  {
    slug: 'flutter-app-development',
    order: 3,
    isCDC: true,
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/Aldenaire-Partners.jpg',
  },
  {
    slug: 'digital-marketing-course',
    order: 4,
    isCDC: true,
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/Untitled-design-2.jpg',
  },
  {
    slug: 'bakery-course',
    order: 5,
    isCDC: true,
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/Untitled-design-3.jpg',
  },
  {
    slug: 'ac-fridge-repair-course',
    order: 6,
    isCDC: true,
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/AC-repair-course.jpg',
  },
  {
    slug: 'beautician-course',
    order: 7,
    isCDC: true,
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/beautician-training-course.jpg',
  },
  {
    slug: 'nail-art-course',
    order: 8,
    isCDC: true,
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/Nail-Art-Course.jpg',
  },
  {
    slug: 'ro-repairing-course',
    order: 9,
    isCDC: true,
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/RO-Repairin-Course.jpg',
  },
];

async function run() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('Connected.');

    for (const item of cdcConfig) {
      const res = await Course.findOneAndUpdate(
        {
          $or: [
            { slug: item.slug },
            { slug: item.slug.replace(/-course$/, '') }
          ]
        },
        {
          $set: {
            isCDC: true,
            order: item.order,
            imageUrl: item.imageUrl
          }
        },
        { new: true }
      );
      if (res) {
        console.log(`Updated: ${res.title} (slug: ${res.slug}) -> order: ${res.order}, isCDC: ${res.isCDC}`);
      } else {
        console.warn(`Course not found for slug: ${item.slug}`);
      }
    }

    console.log('Migration complete.');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

run();
