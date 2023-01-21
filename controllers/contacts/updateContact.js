const createError = require("http-errors");
const { contactAddSchema } = require("../../utils/validation");
const { Contact } = require("../../models/modelContact");

async function updateContact(req, res, next) {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      return next(createError(400, "Missing required name field"));
    }

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      return next(createError(404, "Not found"));
    }

    res.json(result);
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

module.exports = updateContact;
