const express = require('express');

const router = express.Router();

const { getAllProducts, getProductById, searchProduct, addProduct, deleteProduct, getProductsByCategory, getProductQuantity, updateProduct } = require('../controller/product.controller.js');
const { requireAuth, roleAuth, optionalAuth } = require('../middleware/auth.middleware.js');
const { uploadProductImage } = require('../middleware/upload.middleware.js');

router.get('/', getAllProducts);
router.get('/search', searchProduct);
router.get('/quantity', getProductQuantity);

router.get('/category/:category', getProductsByCategory);
router.get('/:id', optionalAuth, getProductById);
router.post('/add', requireAuth, roleAuth(['ADMIN', 'SALESPERSON']), addProduct);
router.delete('/:id', requireAuth, roleAuth(['ADMIN', 'SALESPERSON']), deleteProduct);
router.patch('/:id', requireAuth, roleAuth(["ADMIN", "SALESPERSON"]), uploadProductImage.single('image'), updateProduct);

module.exports = router;