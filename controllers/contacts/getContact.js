const { Contact } = require("../../models/modelContact");
const { HttpError } = require("../../utils/httpError");

async function getContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return next(HttpError(404, "Not found"));
    }

    return res.status(200).json({ contact });
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

module.exports = getContact;
