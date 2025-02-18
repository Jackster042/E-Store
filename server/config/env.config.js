const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const JWT_ALGORITHM = process.env.JWT_ALGORITHM;

const JWT_OPTIONS = {
  expiresIn: JWT_EXPIRES_IN,
  algorithm: JWT_ALGORITHM,
};

module.exports = { JWT_SECRET, JWT_OPTIONS };
