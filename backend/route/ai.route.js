const express = require('express');
const { searchProductByAi } = require('../controller/ai.controller');
const router = express.Router();

router.post('/products', searchProductByAi);

module.exports = router;