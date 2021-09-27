const crypto = require("crypto");

exports.getRandomString = () => {
  const randomString = crypto.randomBytes(20).toString("hex");
  return randomString;
};
