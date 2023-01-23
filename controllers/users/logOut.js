const { Users } = require("../../models/modelUsers");
async function logOut(req, res, next) {
  const { _id } = req.user;
  await Users.findByIdAndUpdate(_id, { token: null });
  res.status(204).json("No Content");
}

module.exports = logOut;
