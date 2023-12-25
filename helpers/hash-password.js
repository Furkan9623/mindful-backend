const bcrypt = require("bcrypt");
const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt
    .hash(password, saltRounds)
    .then((res) => res)
    .catch((er) => er);
};

// match password
const matchPassword = async (password, hasPass) => {
  return bcrypt
    .compare(password, hasPass)
    .then((res) => res)
    .catch((er) => er);
};
module.exports = { hashPassword, matchPassword };
