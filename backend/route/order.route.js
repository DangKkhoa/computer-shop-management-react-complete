const express = require('express');
const { getAllOrders, addOrder, getOrderStatus, updateOrderStatus, getRevenueByMonth, getPendingOrderQuantity, getTop5ProductsSold, getOrderById } = require('../controller/order.controller');
const { requireAuth } = require('../middleware/auth.middleware');

const router = express.Router();



router.get('/', getAllOrders);
router.post('/', addOrder);
router.get('/quantity', requireAuth, getPendingOrderQuantity);
router.get('/top-5-products', requireAuth, getTop5ProductsSold);
router.get('/monthly-revenue', requireAuth, getRevenueByMonth);
router.get('/:id', requireAuth, getOrderById);
router.get('/:id/status', getOrderStatus);
router.patch('/:id/status', requireAuth, updateOrderStatus);

module.exports = router;