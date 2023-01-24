const { Users } = require("../../models/modelUsers");
const { Unauthorized } = require("http-errors");

async function current(req, res, next) {
  const { token } = req.user;
  const { email, subscription } = await Users.findOne({ token });

  if (!token) {
    return next(Unauthorized("Not authorized"));
  }

  res.status(200).json({
    email,
    subscription,
  });
}

module.exports = current;
