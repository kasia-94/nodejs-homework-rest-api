const { contactAddSchema } = require("../../utils/validation");
const createError = require("http-errors");
const { Contact } = require("../../models/modelContact");

async function addContact(req, res, next) {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      return next(createError(400, "Missing required name field"));
    }

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return next(createError(400, "Missing required name field"));
    }

    const newContact = await Contact.create({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

module.exports = addContact;
