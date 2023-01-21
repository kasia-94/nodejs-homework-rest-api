const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrl.getContacts);
router.get("/:contactId", ctrl.getContact);
router.post("/", ctrl.addContact);
router.delete("/:contactId", ctrl.deleteContact);
router.put("/:contactId", ctrl.updateContact);
router.patch("/:contactId/favorite", ctrl.updateStatusContact);

module.exports = router;
