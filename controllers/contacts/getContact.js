const { Contact } = require("../../models/modelContact");
const createError = require("http-errors");

async function getContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return next(createError(404, "Not found"));
    }

    return res.status(200).json({ contact });
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

module.exports = getContact;
