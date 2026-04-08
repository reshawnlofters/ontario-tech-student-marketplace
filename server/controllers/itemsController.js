const itemsService = require('../services/itemsService');

async function getItems(request, response) {
  try {
    const items = await itemsService.getItems();
    response.status(200).json(items);
  } catch (error) {
    response.status(500).json({ message: 'Failed to load items' });
  }
}

async function createItem(request, response) {
  try {
    const { title, category, condition, price, description } = request.body;

    if (!title || !category || !condition || !price || !description) {
      return response.status(400).json({
        message: 'Missing required fields',
      });
    }

    const parsedPrice = Number(price);

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      return response.status(400).json({
        message: 'Price must be a positive number',
      });
    }

    const newItem = await itemsService.createItem({
      ...request.body,
      price: parsedPrice,
    });

    response.status(201).json({
      message: 'Item created successfully',
      item: newItem,
    });
  } catch (error) {
    response.status(500).json({ message: 'Failed to create item' });
  }
}

module.exports = {
  getItems,
  createItem,
};
