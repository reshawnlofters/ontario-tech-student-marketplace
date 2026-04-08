const cartService = require('../services/cartService');
const readJsonFile = require('../utils/readJsonFile');

async function getCart(request, response) {
  try {
    const cartItems = await cartService.getCartItems();
    const items = await readJsonFile('data/items.json');

    const cart = cartItems.map((cartItem) => {
      const item = items.find((i) => i.id === cartItem.itemId);

      return {
        ...cartItem,
        item: item
          ? {
              id: item.id,
              title: item.title,
              category: item.category,
              condition: item.condition,
              price: item.price,
              image: item.image,
              description: item.description,
              sellerName: item.sellerName,
            }
          : null,
        lineTotal: item ? item.price * cartItem.quantity : 0,
      };
    });

    response.status(200).json(cart);
  } catch (error) {
    response.status(500).json({ message: 'Failed to load cart' });
  }
}

async function addItemToCart(request, response) {
  try {
    const { itemId, quantity } = request.body;

    if (!itemId) {
      return response.status(400).json({ message: 'itemId is required' });
    }

    const parsedQuantity = Number(quantity ?? 1);

    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
      return response.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const cartItem = await cartService.addCartItem(itemId, parsedQuantity);

    response.status(201).json({
      message: 'Item added to cart successfully',
      cartItem,
    });
  } catch (error) {
    if (error.message === 'Item not found') {
      return response.status(404).json({ message: 'Item not found' });
    }

    response.status(500).json({ message: 'Failed to add item to cart' });
  }
}

async function updateCart(request, response) {
  try {
    const { id } = request.params;
    const { quantity } = request.body;

    const parsedQuantity = Number(quantity);

    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
      return response.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const updatedItem = await cartService.updateCartItem(id, parsedQuantity);

    response.status(200).json({
      message: 'Cart item updated successfully',
      cartItem: updatedItem,
    });
  } catch (error) {
    if (error.message === 'Cart item not found') {
      return response.status(404).json({ message: 'Cart item not found' });
    }

    response.status(500).json({ message: 'Failed to update cart item' });
  }
}

async function deleteCart(request, response) {
  try {
    const { id } = request.params;
    await cartService.removeCartItem(id);

    response.status(200).json({
      message: 'Cart item removed successfully',
    });
  } catch (error) {
    if (error.message === 'Cart item not found') {
      return response.status(404).json({ message: 'Cart item not found' });
    }

    response.status(500).json({ message: 'Failed to remove cart item' });
  }
}

module.exports = {
  getCart,
  addItemToCart,
  updateCart,
  deleteCart,
};
