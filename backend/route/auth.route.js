const express = require('express');

const router = express.Router();
const { login, register, getMe, logout } = require('../controller/auth.controller.js');
const { requireAuth } = require('../middleware/auth.middleware.js');


// auth for staff, admin
router.post('/user/login', login);
router.post('/user/register', requireAuth, register);
router.post('/user/logout', logout);
router.get('/user/me', requireAuth, getMe);

// auth for customer



module.exports = router;
