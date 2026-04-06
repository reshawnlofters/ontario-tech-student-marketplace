const fs = require('fs').promises;
const path = require('path');

async function readJsonFile(relativePath) {
  const filePath = path.join(__dirname, '..', relativePath);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

module.exports = readJsonFile;
