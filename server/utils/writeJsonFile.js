const fs = require('fs').promises;
const path = require('path');

async function writeJsonFile(relativePath, data) {
  const filePath = path.join(__dirname, '..', relativePath);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = writeJsonFile;
