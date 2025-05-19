const express = require('express');

const router = express.Router();

const { getAllProducts, getProductById, searchProduct, addProduct, deleteProduct, getProductsByCategory, getProductQuantity } = require('../controller/product.controller.js');
const { requireAuth, roleAuth, optionalAuth } = require('../middleware/auth.middleware.js');

router.get('/', getAllProducts);
router.get('/search', searchProduct);
router.get('/quantity', getProductQuantity);

router.get('/category/:category', getProductsByCategory);
router.get('/:id', optionalAuth, getProductById);
router.post('/add', requireAuth, roleAuth(['ADMIN', 'SALESPERSON']), addProduct);
router.delete('/:id', requireAuth, roleAuth(['ADMIN', 'SALESPERSON']), deleteProduct)

module.exports = router;