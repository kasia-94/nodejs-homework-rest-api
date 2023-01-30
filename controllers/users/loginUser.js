const { Users } = require("../../models/modelUsers");
const bcrypt = require("bcrypt");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

async function loginUser(req, res, next) {
  const { email, password } = req.body;
  const { JWT_SECRET_KEY } = process.env;
  const storedUser = await Users.findOne({
    email,
  });

  if (!storedUser) {
    return next(Unauthorized("Email is not valid"));
  }
  const isPasswordValid = await bcrypt.compare(password, storedUser.password);
  if (!isPasswordValid) {
    return next(Unauthorized("Password is not valid"));
  }

  const token = jwt.sign({ id: storedUser._id }, JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  await Users.findByIdAndUpdate(storedUser._id, { token });
  return res.json({
    data: {
      token,
    },
  });
}

module.exports = loginUser;
