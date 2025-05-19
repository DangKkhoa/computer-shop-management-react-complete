const express = require('express');
const router = express.Router();


const { uploadAvatar } = require('../middleware/upload.middleware.js');


const { getAllUsers, getUserByEmailOrPhoneNumber, getUserById,  addUser, updateUser, deleteUser, setAvailability, getUserQuantity } = require('../controller/user.controller.js');

router.get('/', getAllUsers);
router.get('/search', getUserByEmailOrPhoneNumber);
router.get('/quantity', getUserQuantity);

router.get('/:id', getUserById);
router.post('/add', addUser);
router.patch('/:id', uploadAvatar.single('image'), updateUser);
router.delete('/:id', deleteUser);
router.patch('/:id/lock', (req, res) => setAvailability(req, res, true));
router.patch('/:id/unlock', (req, res) => setAvailability(req, res, false));


module.exports = router;
