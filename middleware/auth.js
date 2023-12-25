const jwt = require("jsonwebtoken");
const { createError } = require("./ErrorHandling");
const authMiddleware = async (req, res, next) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = req.headers.authorization;
  try {
    const verifyToken = jwt.verify(token, secretKey);
    req.UserId = verifyToken.id;
    next();
  } catch (error) {
    return next(createError(error.message, 500, "auth controller"));
  }
};

module.exports = authMiddleware;
