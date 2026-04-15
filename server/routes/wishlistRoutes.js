const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

router.get('/', wishlistController.getWishlist);
router.post('/', wishlistController.addItemToWishlist);
router.delete('/:id', wishlistController.deleteWishlistItem);

module.exports = router;
