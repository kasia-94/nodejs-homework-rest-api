const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { Users } = require("../models/modelUsers");

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  try {
    if (type !== "Bearer") {
      return next(Unauthorized("Token type is not valid"));
    }

    if (!token) {
      return next(Unauthorized("No token provided"));
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await Users.findById(id);
    if (!user || !user.token) {
      return next(Unauthorized("Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return next(Unauthorized("Not authorized"));
    }
    console.warn(`Error: ${error}`);
  }
}

module.exports = auth;
