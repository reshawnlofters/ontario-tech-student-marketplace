const readJsonFile = require('../utils/readJsonFile');
const writeJsonFile = require('../utils/writeJsonFile');
const generateId = require('../utils/generateId');
const getDate = require('../utils/getDate');

async function getWishlistItems() {
  return await readJsonFile('data/wishlist.json');
}

async function addWishlistItem(itemId) {
  const wishlistItems = await readJsonFile('data/wishlist.json');
  const items = await readJsonFile('data/items.json');
  const item = items.find((entry) => entry.id === itemId);

  if (!item) {
    throw new Error('Item not found');
  }

  const existingWishlistItem = wishlistItems.find((entry) => entry.itemId === itemId);

  if (existingWishlistItem) {
    throw new Error('Item already in wishlist');
  }

  const newWishlistItem = {
    id: generateId(),
    itemId,
    addedDate: getDate(),
  };

  wishlistItems.push(newWishlistItem);
  await writeJsonFile('data/wishlist.json', wishlistItems);

  return newWishlistItem;
}

async function removeWishlistItem(wishlistItemId) {
  const wishlistItems = await readJsonFile('data/wishlist.json');
  const filteredWishlistItems = wishlistItems.filter((item) => item.id !== wishlistItemId);

  if (filteredWishlistItems.length === wishlistItems.length) {
    throw new Error('Wishlist item not found');
  }

  await writeJsonFile('data/wishlist.json', filteredWishlistItems);
}

module.exports = {
  getWishlistItems,
  addWishlistItem,
  removeWishlistItem,
};
