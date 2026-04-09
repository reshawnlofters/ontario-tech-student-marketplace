const readJsonFile = require('../utils/readJsonFile');
const writeJsonFile = require('../utils/writeJsonFile');
const generateId = require('../utils/generateId');

async function getItems() {
  return await readJsonFile('data/items.json');
}

async function createItem(data) {
  const items = await readJsonFile('data/items.json');

  const newItem = {
    id: generateId(),
    title: data.title,
    category: data.category,
    condition: data.condition,
    price: data.price,
    image: data.image,
    description: data.description,
    sellerName: data.sellerName || 'Anonymous',
    campusTag: data.campusTag,
    createdAt: new Date().toISOString(),
    featured: false,
  };

  items.push(newItem);

  await writeJsonFile('data/items.json', items);

  return newItem;
}

module.exports = {
  getItems,
  createItem,
};
