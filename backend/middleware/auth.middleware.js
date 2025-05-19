const jwt = require("jsonwebtoken");
const { verifyToken } = require("../util/verifyToken.util");

const requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  //console.log(token);
  if (!token) {
    return res.status(403).json({
      status: "fail",
      message: "No token provided",
    });
  }

  verifyToken(token, (err, user) => {
    if(err) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized",
      });
    }

    req.user = user;
    next();
  })

  // const JWT_SECRET = process.env.JWT_SECRET || "khoadeptraivl";
  // jwt.verify(token, JWT_SECRET, (err, decoded) => {
  //   // console.log(token)
  //   if (err) {
  //     return res.status(401).json({
  //       status: "fail",
  //       message: "Unauthorized",
  //     });
  //   }
  //   req.user = decoded.data;
  //   console.log(req.user)
  //   next();
  // });
}

const optionalAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next();
  
  verifyToken(token, (err, user) => {
    if(!err) {
      req.user = user
    }

    next();
  })
}

const roleAuth = (allowRoles = []) => {
  return (req, res, next) => {
    console.log(req.user);
    const { role } = req.user;
    if(role === 'ADMIN') {
      return next();
    }

    if(!allowRoles.includes(role)) {
      return res.status(403).json({
        status: "fail",
        message: "Forbidden",
      });
    }
    next();
  }
}

module.exports = { requireAuth, optionalAuth, roleAuth };