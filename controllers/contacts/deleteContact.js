const { NotFound } = require("http-errors");
const { Contact } = require("../../models/modelContact");

async function deleteContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return next(NotFound("Not found"));
    }

    await Contact.findByIdAndRemove(contactId);
    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

module.exports = deleteContact;
