// const db = require("../models/contacts");
const { NotFound, BadRequest } = require("http-errors");
const { contactUpdateStatusSchema } = require("../../middlewares/validation");
const { Contact } = require("../../models/modelContact");

async function updateStatusContact(req, res, next) {
  try {
    const { error } = contactUpdateStatusSchema.validate(req.body);
    if (error) {
      return next(BadRequest("Missing required name field"));
    }

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
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

module.exports = updateStatusContact;
