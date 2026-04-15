const wishlistService = require('../services/wishlistService');
const readJsonFile = require('../utils/readJsonFile');

async function getWishlist(request, response) {
  try {
    const wishlistItems = await wishlistService.getWishlistItems();
    const items = await readJsonFile('data/items.json');

    const wishlist = wishlistItems
      .map((wishlistItem) => {
        const item = items.find((entry) => entry.id === wishlistItem.itemId);

        if (!item) {
          return null;
        }

        return {
          ...wishlistItem,
          item: {
            id: item.id,
            title: item.title,
            category: item.category,
            condition: item.condition,
            price: item.price,
            image: item.image,
            description: item.description,
            sellerName: item.sellerName,
            campusTag: item.campusTag,
            createdDate: item.createdDate,
            stock: item.stock,
          },
        };
      })
      .filter(Boolean);

    response.status(200).json(wishlist);
  } catch (error) {
    response.status(500).json({ message: 'Failed to load wishlist' });
  }
}

async function addItemToWishlist(request, response) {
  try {
    const { itemId } = request.body;

    if (!itemId) {
      return response.status(400).json({ message: 'itemId is required' });
    }

    const wishlistItem = await wishlistService.addWishlistItem(itemId);

    response.status(201).json({
      message: 'Item added to wishlist successfully',
      wishlistItem,
    });
  } catch (error) {
    if (error.message === 'Item not found') {
      return response.status(404).json({ message: 'Item not found' });
    }

    if (error.message === 'Item already in wishlist') {
      return response.status(409).json({ message: 'Item already in wishlist' });
    }

    response.status(500).json({ message: 'Failed to add item to wishlist' });
  }
}

async function deleteWishlistItem(request, response) {
  try {
    const { id } = request.params;
    await wishlistService.removeWishlistItem(id);

    response.status(200).json({
      message: 'Wishlist item removed successfully',
    });
  } catch (error) {
    if (error.message === 'Wishlist item not found') {
      return response.status(404).json({ message: 'Wishlist item not found' });
    }

    response.status(500).json({ message: 'Failed to remove wishlist item' });
  }
}

module.exports = {
  getWishlist,
  addItemToWishlist,
  deleteWishlistItem,
};
