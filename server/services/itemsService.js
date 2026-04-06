const readJsonFile = require('../utils/readJsonFile');
const writeJsonFile = require('../utils/writeJsonFile');
const generateId = require('../utils/generateId');

async function getAllItems() {
  return await readJsonFile('data/items.json');
}

async function createItem(data) {
  const items = await readJsonFile('data/items.json');

  const newItem = {
    id: generateId('item'),
    title: data.title,
    category: data.category,
    condition: data.condition,
    price: data.price,
    imageUrl: data.imageUrl || 'https://via.placeholder.com/300x200',
    description: data.description,
    sellerName: data.sellerName || 'Anonymous',
    campusTag: data.campusTag || 'Campus Pickup',
    createdAt: new Date().toISOString(),
    featured: false,
  };

  items.push(newItem);

  await writeJsonFile('data/items.json', items);

  return newItem;
}

module.exports = {
  getAllItems,
  createItem,
};
