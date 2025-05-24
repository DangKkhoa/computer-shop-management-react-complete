const multer = require('multer');
const path = require('path');

const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

const fileFilter = (req, file, cb) => {
  if (allowedImageTypes.includes(file.mimetype)) {
    cb(null, true); // hợp lệ
  } else {
    const error = new Error('Chỉ cho phép file ảnh (.jpg, .png, .jpeg)');
    error.code = 'INVALID_IMAGE';
    cb(null, error); // từ chối
  }
  
};

const createUpload = (folder) => multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, `public/uploads/${folder}`),
    filename: (req, file, cb) => {
      const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, unique + path.extname(file.originalname));
    }
  }),
  fileFilter
});

const uploadAvatar = createUpload('avatars');
const uploadProductImage = createUpload('products');

module.exports = { uploadAvatar, uploadProductImage };
