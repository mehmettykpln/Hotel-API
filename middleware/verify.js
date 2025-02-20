const { request } = require('http');
const jwt = require('jsonwebtoken');

const verifytoken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(500).json({ message: 'Login değilsiniz...' });
  }
  jwt.verifytoken(token, 'SECRET_KEY', (err, user) => {
    if (err) res.status(500).json({ message: 'Token Geçersiz!!!' });
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifytoken(req, res, next, () => {
    if (req.user.id == req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(500).json({ message: 'Login değilsiniz...' });
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifytoken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(500).json({ message: 'Admin  değilsiniz...' });
    }
  });
};

module.exports = { verifytoken, verifyUser, verifyAdmin };
