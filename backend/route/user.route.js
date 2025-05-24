const express = require('express');
const router = express.Router();


const { uploadAvatar } = require('../middleware/upload.middleware.js');
const { requireAuth, optionalAuth, roleAuth } = require('../middleware/auth.middleware.js');

const { getAllUsers, getUserByEmailOrPhoneNumber, getUserById,  addUser, updateUser, deleteUser, setAvailability, getUserQuantity, updatePassword, updateToken } = require('../controller/user.controller.js');

router.get('/', requireAuth, roleAuth(["ADMIN"]), getAllUsers);
router.post('/send-code', updateToken);
router.get('/search', requireAuth, roleAuth, getUserByEmailOrPhoneNumber);
router.get('/quantity', requireAuth, roleAuth, getUserQuantity);
router.get('/:id',requireAuth, roleAuth(["ADMIN"]), getUserById);
router.post('/add', requireAuth, roleAuth(["ADMIN"]), addUser);
router.patch('/change-password', requireAuth, updatePassword);
router.patch('/:id', requireAuth, uploadAvatar.single('image'), updateUser);
router.delete('/:id', requireAuth, roleAuth(["ADMIN"]), deleteUser);
router.patch('/:id/lock', requireAuth, roleAuth(["ADMIN"]), (req, res) => setAvailability(req, res, true));
router.patch('/:id/unlock', requireAuth, roleAuth(["ADMIN"]), (req, res) => setAvailability(req, res, false));


module.exports = router;
