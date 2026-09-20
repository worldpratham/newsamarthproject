const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const offlineFile = path.join(dataDir, 'offline_submissions.json');

function saveOffline(type, data) {
  try {
    let existing = {};
    if (fs.existsSync(offlineFile)) {
      existing = JSON.parse(fs.readFileSync(offlineFile, 'utf8') || '{}');
    }
    if (!existing[type]) existing[type] = [];
    existing[type].push({
      ...data,
      _id: 'offline_' + Date.now(),
      createdAt: new Date().toISOString()
    });
    fs.writeFileSync(offlineFile, JSON.stringify(existing, null, 2), 'utf8');
    console.log(`[Offline Storage]: Saved new ${type} submission.`);
  } catch (err) {
    console.error('Error saving offline submission:', err.message);
  }
}

function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

module.exports = {
  isDbConnected,
  saveOffline
};
