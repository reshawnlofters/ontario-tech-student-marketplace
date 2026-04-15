const readJsonFile = require('../utils/readJsonFile');
const writeJsonFile = require('../utils/writeJsonFile');
const generateId = require('../utils/generateId');
const getDate = require('../utils/getDate');

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

  const itemStock = Number(existingItem.stock) || 1;
  const existingCartItem = cartItems.find((item) => item.itemId === itemId);

  if (existingCartItem) {
    const newQuantity = existingCartItem.quantity + quantity;

    if (newQuantity > itemStock) {
      throw new Error('Cannot add more than available stock.');
    }

    existingCartItem.quantity = newQuantity;
    await writeJsonFile('data/cart.json', cartItems);
    return existingCartItem;
  }

  if (quantity > itemStock) {
    throw new Error('Cannot add more than available stock.');
  }

  const newCartItem = {
    id: generateId(),
    itemId,
    quantity,
    addedDate: getDate(),
  };

  cartItems.push(newCartItem);
  await writeJsonFile('data/cart.json', cartItems);

  return newCartItem;
}

async function updateCartItem(cartId, quantity) {
  const cartItems = await readJsonFile('data/cart.json');
  const items = await readJsonFile('data/items.json');
  const cartItem = cartItems.find((cartItem) => cartItem.id === cartId);

  if (!cartItem) {
    throw new Error('Cart item not found');
  }

  const existingItem = items.find((item) => item.id === cartItem.itemId);

  if (!existingItem) {
    throw new Error('Item not found');
  }

  const itemStock = Number(existingItem.stock) || 1;

  if (quantity > itemStock) {
    throw new Error('Cannot set quantity above available stock');
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
