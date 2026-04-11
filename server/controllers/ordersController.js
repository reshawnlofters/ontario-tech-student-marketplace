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

async function cancelOrder(request, response) {
  try {
    const { id } = request.params;
    await ordersService.removeOrder(id);

    response.status(200).json({
      message: 'Order cancelled successfully',
    });
  } catch (error) {
    if (error.message === 'Order not found') {
      return response.status(404).json({ message: 'Order not found' });
    }

    response.status(500).json({ message: 'Failed to cancel order' });
  }
}

module.exports = {
  getOrders,
  createOrder,
  cancelOrder,
};
