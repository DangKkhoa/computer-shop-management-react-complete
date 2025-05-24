const express = require('express');
const { getAllOrders, addOrder, getOrderStatus, updateOrderStatus, getRevenueByMonth, getPendingOrderQuantity, getTop5ProductsSold, getOrderById, getSaleHistory, searchOrder } = require('../controller/order.controller');
const { requireAuth, roleAuth } = require('../middleware/auth.middleware');

const router = express.Router();



router.get('/', getAllOrders);
router.post('/', addOrder);
router.get('/sale-history', requireAuth, roleAuth(["ADMIN", "ACCOUNTANT"]), getSaleHistory);
router.get('/search', requireAuth, roleAuth(["ADMIN", "SALESPERSON"]), searchOrder);
router.get('/quantity', requireAuth, getPendingOrderQuantity);
router.get('/top-5-products', requireAuth, getTop5ProductsSold);
router.get('/monthly-revenue', requireAuth, getRevenueByMonth);
router.get('/:id', getOrderById);
router.get('/:id/status', getOrderStatus);
router.patch('/:id/status', requireAuth, updateOrderStatus);

module.exports = router;