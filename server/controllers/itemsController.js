const itemsService = require('../services/itemsService');

async function getItems(req, res) {
  try {
    const items = await itemsService.getAllItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load items' });
  }
}

async function createItem(req, res) {
  try {
    const { title, category, condition, price, description } = req.body;

    if (!title || !category || !condition || !price || !description) {
      return res.status(400).json({
        message: 'Missing required fields',
      });
    }

    const parsedPrice = Number(price);

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({
        message: 'Price must be a positive number',
      });
    }

    const newItem = await itemsService.createItem({
      ...req.body,
      price: parsedPrice,
    });

    res.status(201).json({
      message: 'Item created successfully',
      item: newItem,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create item' });
  }
}

module.exports = {
  getItems,
  createItem,
};
