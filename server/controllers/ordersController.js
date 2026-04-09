const ordersService = require('../services/ordersService');

async function getOrders(request, response) {
  try {
    const orders = await ordersService.getOrders();
    response.status(200).json(orders);
  } catch (error) {
    response.status(500).json({ message: 'Failed to load orders' });
  }
}

async function createOrder(request, response) {
  try {
    const { discountCode = '', paymentMethod, deliveryMethod } = request.body;

    if (!paymentMethod || !deliveryMethod) {
      return response.status(400).json({
        message: 'paymentMethod and deliveryMethod are required',
      });
    }

    const order = await ordersService.createOrder({
      discountCode,
      paymentMethod,
      deliveryMethod,
    });

    response.status(201).json({
      message: 'Order placed successfully',
      order,
    });
  } catch (error) {
    if (error.message === 'Cart is empty') {
      return response.status(400).json({ message: 'Cart is empty' });
    }

    response.status(500).json({ message: 'Failed to place order' });
  }
}

module.exports = {
  getOrders,
  createOrder,
};
