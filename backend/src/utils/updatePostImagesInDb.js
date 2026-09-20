require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Post = require('../models/Post');

const imageUpdates = [
  {
    slug: 'workshop-reportfoundation-of-innovation-workshop-16-18-february-2026organized-under-the-aegis-of-the-career-development-centre',
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2026/03/e1-e1772866577981.png'
  },
  {
    slug: 'samarth-bharat-vichar-goshti-2026',
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2026/07/2.jpg'
  },
  {
    slug: 'dseu-signs-mou-with-samarth-bharat-and-sewa-bharti-to-promote-skill-development-and-socialupliftment',
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-21-at-12.19.51-PM-1.jpeg'
  },
  {
    slug: 'seed-fund-accelerator-pitching-competition',
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/09/shivaji-college-accelerator-pitching-competition-1.jpeg'
  },
  {
    slug: 'my-career-my-choice-a-step-towards-clarity-in-career-building',
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/09/Mata-sundari-college-career-workshop.jpeg'
  },
  {
    slug: 'training-to-self-employment-success-story-program',
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/06/baff6d0e-578b-4539-be5e-2c241f9d56cb.jpg'
  }
];

async function updatePosts() {
  try {
    // 1. Update postsData.json
    const postsDataPath = path.join(__dirname, '../seeds/postsData.json');
    if (fs.existsSync(postsDataPath)) {
      const posts = JSON.parse(fs.readFileSync(postsDataPath, 'utf8'));
      let updatedCount = 0;
      posts.forEach(p => {
        const found = imageUpdates.find(u => u.slug === p.slug);
        if (found) {
          p.imageUrl = found.imageUrl;
          updatedCount++;
        }
      });
      fs.writeFileSync(postsDataPath, JSON.stringify(posts, null, 2));
      console.log(`Updated ${updatedCount} posts in postsData.json`);
    }

    // 2. Update MongoDB Atlas
    const uri = process.env.MONGODB_URI;
    if (uri) {
      console.log('Connecting to MongoDB...');
      await mongoose.connect(uri);
      console.log('Connected.');

      for (const item of imageUpdates) {
        const res = await Post.findOneAndUpdate(
          { slug: item.slug },
          { $set: { imageUrl: item.imageUrl } },
          { new: true }
        );
        if (res) {
          console.log(`Updated in DB: ${item.slug} -> ${item.imageUrl}`);
        } else {
          console.log(`Slug not found in DB: ${item.slug}`);
        }
      }
      await mongoose.disconnect();
      console.log('DB sync complete.');
    }
  } catch (err) {
    console.error('Error updating posts:', err);
  }
}

updatePosts();
