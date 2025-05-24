const express = require('express');
const { getAllOrders, addOrder, getOrderStatus, updateOrderStatus, getRevenueByMonth, getPendingOrderQuantity, getTop5ProductsSold, getOrderById, getSaleHistory, searchOrder, getSaleHistoryById, searchSaleHistory } = require('../controller/order.controller');
const { requireAuth, roleAuth } = require('../middleware/auth.middleware');

const router = express.Router();


router.get('/', requireAuth, roleAuth(["ADMIN", "ACCOUNTANT"]), getSaleHistory);
router.get('/search', requireAuth, roleAuth(["ADMIN", "ACCOUNTANT"]), searchSaleHistory)
router.get('/:id', requireAuth, roleAuth(["ADMIN", "ACCOUNTANT"]), getSaleHistoryById);


module.exports = router;