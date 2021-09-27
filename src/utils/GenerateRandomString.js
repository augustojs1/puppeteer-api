const crypto = require("crypto");

exports.generateRandomString = () => {
  const randomString = crypto.randomBytes(20).toString("hex");
  return randomString;
};
