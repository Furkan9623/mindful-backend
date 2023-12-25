const jwt = require("jsonwebtoken");
const generateToken = async (id) => {
  const secreateKey = process.env.JWT_SECRET_KEY;
  try {
    const token = jwt.sign({ id }, secreateKey, { expiresIn: "1d" });
    return token;
  } catch (error) {
    return error;
  }
};
module.exports = { generateToken };
