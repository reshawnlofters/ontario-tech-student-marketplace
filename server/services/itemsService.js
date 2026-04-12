const readJsonFile = require('../utils/readJsonFile');
const writeJsonFile = require('../utils/writeJsonFile');
const generateId = require('../utils/generateId');
const getDate = require('../utils/getDate');

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
    createdDate: getDate(),
    stock: data.stock,
  };

  items.push(newItem);

  await writeJsonFile('data/items.json', items);

  return newItem;
}

module.exports = {
  getItems,
  createItem,
};
