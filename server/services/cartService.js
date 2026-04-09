const readJsonFile = require('../utils/readJsonFile');
const writeJsonFile = require('../utils/writeJsonFile');
const generateId = require('../utils/generateId');

async function getCartItems() {
  return await readJsonFile('data/cart.json');
}

async function addCartItem(itemId, quantity = 1) {
  const cartItems = await readJsonFile('data/cart.json');
  const items = await readJsonFile('data/items.json');

  const existingItem = items.find((item) => item.id === itemId);
  if (!existingItem) {
    throw new Error('Item not found');
  }

  const existingCartItem = cartItems.find((item) => item.itemId === itemId);

  if (existingCartItem) {
    existingCartItem.quantity += quantity;
    await writeJsonFile('data/cart.json', cartItems);
    return existingCartItem;
  }

  const newCartItem = {
    id: generateId(),
    itemId,
    quantity,
    addedAt: new Date().toISOString(),
  };

  cartItems.push(newCartItem);
  await writeJsonFile('data/cart.json', cartItems);

  return newCartItem;
}

async function updateCartItem(cartItemId, quantity) {
  const cartItems = await readJsonFile('data/cart.json');
  const cartItem = cartItems.find((item) => item.id === cartItemId);

  if (!cartItem) {
    throw new Error('Cart item not found');
  }

  cartItem.quantity = quantity;
  await writeJsonFile('data/cart.json', cartItems);

  return cartItem;
}

async function removeCartItem(cartItemId) {
  const cartItems = await readJsonFile('data/cart.json');
  const filteredCartItems = cartItems.filter((item) => item.id !== cartItemId);

  if (filteredCartItems.length === cartItems.length) {
    throw new Error('Cart item not found');
  }

  await writeJsonFile('data/cart.json', filteredCartItems);
}

async function clearCart() {
  await writeJsonFile('data/cart.json', []);
}

module.exports = {
  getCartItems,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
};
