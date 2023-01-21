const { Users } = require("../../models/modelUsers");
const { registerUserSchema } = require("../../utils/validation");
const createError = require("http-errors");
const bcrypt = require("bcrypt");

async function register(req, res, next) {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hasedPwd = await bcrypt.hash(password, salt);
  try {
    const { error } = registerUserSchema.validate(req.body);
    if (error) {
      return next(createError(400, "Missing required field"));
    }

    const savedUser = await Users.create({ email, password: hasedPwd });
    res.status(201).json({ user: savedUser });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      return next(createError(409, "Email in use"));
    }

    throw error;
  }
}

module.exports = register;
