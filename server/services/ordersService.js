const readJsonFile = require('../utils/readJsonFile');
const writeJsonFile = require('../utils/writeJsonFile');
const generateId = require('../utils/generateId');
const cartService = require('./cartService');

function getDiscountPercentage(discountCode) {
  if (discountCode === 'OTSM10') return 10;
  return 0;
}

async function getOrders() {
  return await readJsonFile('data/orders.json');
}

async function createOrder({ discountCode = '', paymentMethod, deliveryMethod }) {
  const cartItems = await readJsonFile('data/cart.json');
  const items = await readJsonFile('data/items.json');
  const orders = await readJsonFile('data/orders.json');

  if (cartItems.length === 0) {
    throw new Error('Cart is empty');
  }

  const orderItems = cartItems.map((cartItem) => {
    const item = items.find((i) => i.id === cartItem.itemId);

    if (!item) {
      throw new Error('One or more cart items could not be found');
    }

    return {
      itemId: item.id,
      image: item.image,
      title: item.title,
      price: item.price,
      quantity: cartItem.quantity,
      total: item.price * cartItem.quantity,
    };
  });

  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
  const discountPercentage = getDiscountPercentage(discountCode);
  const discountAmount = subtotal * (discountPercentage / 100);
  const total = subtotal - discountAmount;

  const newOrder = {
    id: generateId(),
    items: orderItems,
    subtotal,
    discountCode,
    discountPercentage,
    discountAmount,
    total,
    paymentMethod,
    deliveryMethod,
    createdAt: new Date().toISOString(),
  };

  orders.unshift(newOrder);
  await writeJsonFile('data/orders.json', orders);
  await cartService.clearCart();

  return newOrder;
}

module.exports = {
  getOrders,
  createOrder,
};
