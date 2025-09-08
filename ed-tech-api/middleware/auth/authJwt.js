// auth/verifyToken.js
const dotenv = require('dotenv')
const jwt=require('jsonwebtoken')
dotenv.config();

const auth = {
  verifyToken: (req, res, next) => {
    try {
      // support both header styles
      let token = req.headers['x-access-token'] || req.headers['authorization'];

      if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
      }

      // If header is "Bearer <token>" or "Token <token>", extract the token part
      if (typeof token === 'string') {
        const parts = token.split(' ');
        if (parts.length === 2 && (parts[0] === 'Bearer' || parts[0] === 'Token')) {
          token = parts[1];
        }
      }

      // Verify token synchronously (throws on invalid/expired)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach decoded payload to req.user and continue
      req.user = decoded;
      return next();
    } catch (err) {
      console.error('verifyToken error:', err && err.message ? err.message : err);
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
  }
};

module.exports=auth
