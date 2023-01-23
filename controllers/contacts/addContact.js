const { contactAddSchema } = require("../../middlewares/validation");
const { BadRequest } = require("http-errors");
const { Contact } = require("../../models/modelContact");

async function addContact(req, res, next) {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      return next(BadRequest("Missing required name field"));
    }

    const { name, email, phone } = req.body;
    const { _id } = req.user;

    if (!name || !email || !phone) {
      return next(BadRequest("Missing required name field"));
    }

    const newContact = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json(newContact);
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

module.exports = addContact;
