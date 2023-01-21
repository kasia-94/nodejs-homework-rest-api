const { Users } = require("../../models/modelUsers");
const bcrypt = require("bcrypt");

async function loginUser(req, res, next) {
  const { email, password } = req.body;

  const storedUser = await Users.findOne({
    email,
  });

  if (!storedUser) {
    return res.status(401).json({
      message: "Email is not valid",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Password is not valid",
    });
  }

  return res.json({
    data: {
      token: "<TOKEN>",
    },
  });
}

module.exports = loginUser;
