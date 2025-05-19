const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "khoadeptraivl";


const verifyToken = (toke, callback) => {
  jwt.verify(toke, JWT_SECRET, (err, decoded) => {
    if(err) return callback(null, err);
    callback(null, decoded.data);
  })
}

module.exports = { verifyToken }