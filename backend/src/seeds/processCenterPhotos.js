require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const Center = require('../models/Center');

const PHOTOS_SOURCE_DIR = 'P:\\Center wise photos';
const PUBLIC_TARGET_DIR = path.resolve(__dirname, '../../../frontend/public/centers');

const VALID_IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function processCenterPhotos() {
  console.log('🚀 Starting Center Photos Processing & Optimization...');

  if (!fs.existsSync(PHOTOS_SOURCE_DIR)) {
    throw new Error(`Source directory not found: ${PHOTOS_SOURCE_DIR}`);
  }

  // Ensure public/centers exists
  if (!fs.existsSync(PUBLIC_TARGET_DIR)) {
    fs.mkdirSync(PUBLIC_TARGET_DIR, { recursive: true });
  }

  // Read centers from centersData.json
  const seedPath = path.resolve(__dirname, 'centersData.json');
  const allCenters = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
  console.log(`Loaded ${allCenters.length} centers from centersData.json.`);

  // Read all folders from P:\Center wise photos
  const rawFolders = fs.readdirSync(PHOTOS_SOURCE_DIR);
  const sortedFolders = rawFolders
    .map((folderName) => {
      const match = folderName.match(/^(\d+)\./);
      return {
        num: match ? parseInt(match[1], 10) : 0,
        folderName,
        fullPath: path.join(PHOTOS_SOURCE_DIR, folderName),
      };
    })
    .filter((f) => f.num > 0)
    .sort((a, b) => a.num - b.num);

  console.log(`Found ${sortedFolders.length} numbered center folders in ${PHOTOS_SOURCE_DIR}.`);

  // Explicit mappings for centers 1 to 74
  function findMatchingCenter(num) {
    switch (num) {
      case 1:
        return allCenters.find((c) => c.centerName.includes('Dilshad') && c.trainingName.includes('Beautician'));
      case 2:
        return allCenters.find((c) => c.centerName.includes('Dilshad') && c.trainingName.includes('AC'));
      case 3:
        return allCenters.find((c) => c.centerName.includes('Pul Pehladpur') && c.trainingName.includes('Beautician'));
      case 4:
        return allCenters.find((c) => c.centerName.includes('Pul Pehladpur') && (c.trainingName.includes('Fashion') || c.trainingName.includes('Cutting')));
      case 5:
        return allCenters.find((c) => c.centerName.includes('Kalkaji'));
      case 6:
        return allCenters.find((c) => c.centerName.includes('Green Park') && c.trainingName.includes('Beautician'));
      case 7:
        return allCenters.find((c) => c.centerName.includes('Green Park') && c.trainingName.includes('Bakery'));
      case 8:
        return allCenters.find((c) => c.centerName.includes('Green Park') && c.trainingName.includes('Nail'));
      case 9:
        return allCenters.find((c) => c.centerName.includes('Okhla'));
      case 10:
        return allCenters.find((c) => c.centerName.includes('Dakshinpuri'));
      case 11:
        return allCenters.find((c) => c.centerName.includes('Sangam Vihar') && c.trainingName.includes('Bakery'));
      case 12:
        return allCenters.find((c) => c.centerName.includes('Sangam Vihar') && c.trainingName.includes('AC'));
      case 13:
        return allCenters.find((c) => c.centerName.includes('Bhati Mines'));
      case 14:
        return allCenters.find((c) => c.centerName.includes('Bijwasan'));
      case 15:
        return allCenters.find((c) => c.centerName.includes('Chhawla'));
      case 16:
        return allCenters.find((c) => c.centerName.includes('Najafgarh'));
      case 17:
        return allCenters.find((c) => c.centerName.includes('Krishna Colony') && c.trainingName.includes('Beautician'));
      case 18:
        return allCenters.find((c) => c.centerName.includes('Krishna Colony') && c.trainingName.includes('Nail'));
      case 19:
        return allCenters.find((c) => c.centerName.includes('Mundka'));
      case 20:
        return allCenters.find((c) => c.centerName.includes('Dwarka Mor'));
      case 21:
        return allCenters.find((c) => c.centerName.includes('Uttam Nagar') && (c.trainingName.includes('Fashion') || c.trainingName.includes('Cutting')));
      case 22:
        return allCenters.find((c) => c.centerName.includes('Uttam Nagar') && c.trainingName.includes('AC'));
      case 23:
        return allCenters.find((c) => c.centerName.includes('New Delhi - Bike'));
      case 24:
        return allCenters.find((c) => c.centerName.includes('Tihar Jail'));
      case 25:
        return allCenters.find((c) => c.centerName.includes('KIRTI NAGAR'));
      case 26:
        return allCenters.find((c) => c.centerName.includes('Tilak Nagar'));
      case 27:
        return allCenters.find((c) => c.centerName.includes('Karol Bagh') && c.trainingName.includes('Beautician'));
      case 28:
        return allCenters.find((c) => c.centerName.includes('Karol Bagh') && c.trainingName.includes('Nail'));
      case 29:
        return allCenters.find((c) => c.centerName.includes('Keshavpuram') && c.trainingName.includes('Beautician'));
      case 30:
        return allCenters.find((c) => c.centerName.includes('Keshavpuram') && c.trainingName.includes('Nail'));
      case 31:
        return allCenters.find((c) => c.centerName.includes('Keshavpuram') && c.trainingName.includes('AC'));
      case 32:
        return allCenters.find((c) => c.centerName.includes('Nirman Vihar'));
      case 33:
        return allCenters.find((c) => c.centerName.includes('New Friends Colony'));
      case 34:
        return allCenters.find((c) => c.centerName.includes('Gurugram APML'));
      case 35:
        return allCenters.find((c) => c.centerName.includes('Nuh'));
      case 36:
        return allCenters.find((c) => c.centerName.includes('Gurugram Nathupur'));
      case 37:
        return allCenters.find((c) => c.centerName.includes('JIND'));
      case 38:
        return allCenters.find((c) => c.centerName.includes('Ludhiana') && c.trainingName.includes('Beautician') && !c.address.includes('Kidwai'));
      case 39:
        return allCenters.find((c) => c.centerName.includes('Ludhiana') && c.trainingName.includes('Nail'));
      case 40:
        return allCenters.find((c) => c.centerName.includes('Ludhiana') && c.trainingName.includes('GST'));
      case 41:
        return allCenters.find((c) => c.centerName.includes('Ludhiana') && c.trainingName.includes('Beautician') && c.address.includes('Kidwai'));
      case 42:
        return allCenters.find((c) => c.centerName.includes('Ludhiana') && c.trainingName.includes('Fashion'));
      case 43:
        return allCenters.find((c) => c.centerName.includes('Jalandhar'));
      case 44:
        return allCenters.find((c) => c.centerName.includes('Moga'));
      case 45:
        return allCenters.find((c) => c.centerName.includes('Civil Lines') && c.trainingName.includes('Beautician'));
      case 46:
        return allCenters.find((c) => c.centerName.includes('Civil Lines') && c.trainingName.includes('Fashion'));
      case 47:
        return allCenters.find((c) => c.centerName.includes('Jawahar Nagar') && c.trainingName.includes('Beautician'));
      case 48:
        return allCenters.find((c) => c.centerName.includes('Jawahar Nagar') && c.trainingName.includes('Fashion'));
      case 49:
        return allCenters.find((c) => c.centerName.includes('Jaipur - Fashion') && c.address.includes('Jagatpura'));
      case 50:
        return allCenters.find((c) => c.centerName.includes('Jaipur - Furniture') && c.address.includes('Jagatpura'));
      case 51:
        return allCenters.find((c) => c.centerName.includes('Jaipur - AC') && c.address.includes('Basant Vihar'));
      case 52:
        return allCenters.find((c) => c.centerName.includes('Jodhpur') && c.trainingName.includes('GDA'));
      case 53:
        return allCenters.find((c) => c.centerName.includes('Jodhpur') && c.trainingName.includes('Beautician'));
      case 54:
        return allCenters.find((c) => c.centerName.includes('Jodhpur') && c.trainingName.includes('Solar'));
      case 55:
        return allCenters.find((c) => c.centerName.includes('Ghaziabad') && c.trainingName.includes('AC'));
      case 56:
        return allCenters.find((c) => c.centerName.includes('Ghaziabad') && c.trainingName.includes('GDA'));
      case 57:
        return allCenters.find((c) => c.centerName.includes('Lucknow Gomtinagar') && c.trainingName.includes('AC'));
      case 58:
        return allCenters.find((c) => c.centerName.includes('Lucknow Gomtinagar') && c.trainingName.includes('Beautician'));
      case 59:
        return allCenters.find((c) => c.centerName.includes('Lucknow Gomtinagar') && c.trainingName.includes('Fashion'));
      case 60:
        return allCenters.find((c) => c.centerName.includes('Lucknow Faijullahganj'));
      case 61:
        return allCenters.find((c) => c.centerName.includes('Lucknow Gomtinagar') && c.trainingName.includes('Motor'));
      case 62:
        return allCenters.find((c) => c.centerName.includes('Lucknow Rajendra Nagar'));
      case 63:
        return allCenters.find((c) => c.centerName.includes('Lucknow BKT'));
      case 64:
        return allCenters.find((c) => c.centerName.includes('Varanasi') && c.address.includes('Rohaniya'));
      case 65:
        return allCenters.find((c) => c.centerName.includes('Varanasi') && c.address.includes('Assi'));
      case 66:
        return allCenters.find((c) => c.centerName.includes('Mathura'));
      case 67:
        return allCenters.find((c) => c.centerName.includes('Greater Noida') && c.trainingName.includes('GDA'));
      case 68:
        return allCenters.find((c) => c.centerName.includes('Greater Noida') && c.trainingName.includes('Fashion'));
      case 69:
        return allCenters.find((c) => c.centerName.includes('Deoria'));
      case 70:
        return allCenters.find((c) => c.centerName.includes('Three Phase Electrician'));
      case 71:
        return allCenters.find((c) => c.centerName.includes('Panvel'));
      case 72:
        return allCenters.find((c) => c.centerName.includes('Kolkata') && c.address.includes('Michael Nagar'));
      case 73:
        return allCenters.find((c) => c.centerName.includes('Kolkata') && c.address.includes('Panihati'));
      case 74:
        return allCenters.find((c) => c.centerName.includes('Kolkata') && c.address.includes('Bagnan'));
      default:
        return null;
    }
  }

  let totalImagesProcessed = 0;
  let totalBytesSaved = 0;
  let totalNewBytes = 0;
  const processedCentersMap = new Map();

  for (const item of sortedFolders) {
    const center = findMatchingCenter(item.num);
    if (!center) {
      console.warn(`⚠️ Warning: No matching center for folder ${item.num}: ${item.folderName}`);
      continue;
    }

    const folderFiles = fs.readdirSync(item.fullPath);
    const imageFiles = folderFiles.filter((fileName) => {
      const ext = path.extname(fileName).toLowerCase();
      return VALID_IMAGE_EXTS.has(ext) && !fileName.startsWith('.');
    });

    if (imageFiles.length === 0) {
      console.warn(`⚠️ No images found in folder: ${item.folderName} (keeping existing fallback)`);
      continue;
    }

    const targetSubDir = path.join(PUBLIC_TARGET_DIR, `center-${item.num}`);
    if (!fs.existsSync(targetSubDir)) {
      fs.mkdirSync(targetSubDir, { recursive: true });
    }

    const generatedUrls = [];
    const imagesToProcess = imageFiles.slice(0, 4);

    for (let i = 0; i < imagesToProcess.length; i++) {
      const srcFile = path.join(item.fullPath, imagesToProcess[i]);
      const targetFileName = `img-${i + 1}.webp`;
      const targetFile = path.join(targetSubDir, targetFileName);

      try {
        const inStat = fs.statSync(srcFile);

        await sharp(srcFile, { failOnError: false, failOn: 'none' })
          .resize(800, 600, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .webp({ quality: 82 })
          .toFile(targetFile);

        const outStat = fs.statSync(targetFile);
        totalBytesSaved += inStat.size - outStat.size;
        totalNewBytes += outStat.size;
        totalImagesProcessed++;

        generatedUrls.push(`/centers/center-${item.num}/${targetFileName}`);
      } catch (fileErr) {
        console.warn(`⚠️ Skipped corrupt file ${imagesToProcess[i]}: ${fileErr.message}`);
      }
    }

    if (generatedUrls.length === 0) {
      console.warn(`⚠️ Could not process any images for ${item.folderName}`);
      continue;
    }

    // Ensure 4 images in array for full 4-grid UI display
    while (generatedUrls.length < 4 && generatedUrls.length > 0) {
      generatedUrls.push(generatedUrls[generatedUrls.length % generatedUrls.length]);
    }

    center.images = generatedUrls;
    processedCentersMap.set(center.centerName, generatedUrls);

    console.log(`✅ [${item.num}/74] ${center.centerName} -> ${generatedUrls.length} images saved to /centers/center-${item.num}/`);
  }

  console.log(`\n🎉 Image processing complete!`);
  console.log(`- Total Centers with New Real Photos: ${processedCentersMap.size}`);
  console.log(`- Total Images Processed: ${totalImagesProcessed}`);
  console.log(`- Total New Optimized Size: ${(totalNewBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`- Space Saved via WebP Compression: ${(totalBytesSaved / (1024 * 1024)).toFixed(2)} MB`);

  // Write updated centersData.json
  fs.writeFileSync(seedPath, JSON.stringify(allCenters, null, 2), 'utf8');
  console.log(`✅ Updated centersData.json with real photo paths.`);

  // Write frontend/src/data/centersData.ts
  const tsPath = path.resolve(__dirname, '../../../frontend/src/data/centersData.ts');
  const tsContent = `import { CenterApiModel } from '@/services/courseApi';\n\nexport const FALLBACK_CENTERS: CenterApiModel[] = ${JSON.stringify(allCenters, null, 2)};\n`;
  fs.writeFileSync(tsPath, tsContent, 'utf8');
  console.log(`✅ Updated frontend/src/data/centersData.ts.`);

  // Connect to MongoDB and update
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (mongoUri) {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB! Updating Center documents...');

    for (const [centerName, images] of processedCentersMap.entries()) {
      await Center.updateMany({ centerName }, { $set: { images } });
    }

    console.log(`✅ Successfully updated ${processedCentersMap.size} centers in MongoDB with real photos!`);
    await mongoose.disconnect();
  }

  console.log('\n🏁 All done! Center photos are now live and served from /centers/...');
}

processCenterPhotos().catch((err) => {
  console.error('❌ Error processing photos:', err);
  process.exit(1);
});
