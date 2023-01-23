const { Contact } = require("../../models/modelContact");

async function getContacts(req, res) {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;

    if (favorite) {
      const result = await Contact.find(
        { owner: _id, favorite },
        "-createdAt -updatedAt",
        {
          skip,
          limit: Number(limit),
        }
      ).populate("owner", "email");
      return res.json(result);
    }

    const contacts = await Contact.find(
      { owner: _id },
      { skip, limit: Number(limit) }
    ).populate("owner", "email");

    res.status(200).json({ contacts });
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

module.exports = getContacts;
