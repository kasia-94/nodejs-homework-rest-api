const { Users } = require("../../models/modelUsers");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

async function loginUser(req, res, next) {
  const { email, password } = req.body;
  const storedUser = await Users.findOne({
    email,
  });

  if (!storedUser) {
    return next(createError(401, "Email is not valid"));
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);
  if (!isPasswordValid) {
    return next(createError(401, "Password is not valid"));
  }

  return res.json({
    data: {
      token: "<TOKEN>",
    },
  });
}

module.exports = loginUser;
