const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "naman11111111", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
