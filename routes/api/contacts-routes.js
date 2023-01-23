const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const auth = require("../../middlewares/auth");

router.get("/", auth, ctrl.getContacts);
router.get("/:contactId", auth, ctrl.getContact);
router.post("/", auth, ctrl.addContact);
router.delete("/:contactId", auth, ctrl.deleteContact);
router.put("/:contactId", auth, ctrl.updateContact);
router.patch("/:contactId/favorite", auth, ctrl.updateStatusContact);

module.exports = router;
