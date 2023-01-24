const { Users } = require("../../models/modelUsers");
const { BadRequest, NotFound } = require("http-errors");
const { usersUpdateSubscription } = require("../../middlewares/validation");

async function updateSubscription(req, res, next) {
  try {
    const { error } = usersUpdateSubscription.validate(req.body);
    if (error) {
      return next(BadRequest("Wrong type of validation"));
    }
    const { _id } = req.user;
    const result = await Users.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    if (!result) {
      return next(NotFound("Not found"));
    }
    res.json(result);
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

module.exports = updateSubscription;
