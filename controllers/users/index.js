const register = require("./register");
const loginUser = require("./loginUser");
const current = require("./current");
const logOut = require("./logOut");
const updateSubscription = require("./updateSubscription");
const updateAvatars = require("./updateAvatars");
const verifyEmail = require("./verifyEmail");
const verifyRepeated = require("./verifyRepeated");

module.exports = {
  register,
  loginUser,
  current,
  logOut,
  updateSubscription,
  updateAvatars,
  verifyEmail,
  verifyRepeated,
};
