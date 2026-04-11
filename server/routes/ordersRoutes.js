const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

router.get('/', ordersController.getOrders);
router.post('/', ordersController.createOrder);
router.delete('/:id', ordersController.cancelOrder);

module.exports = router;
