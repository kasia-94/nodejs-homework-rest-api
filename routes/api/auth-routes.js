const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../../controllers");
const auth = require("../../middlewares/auth");
const { upload } = require("../../middlewares/storage");

router.post("/register", ctrl.register);
router.post("/login", ctrl.loginUser);
router.get("/current", auth, ctrl.current);
router.post("/logout", auth, ctrl.logOut);
router.patch("/subscription", auth, ctrl.updateSubscription);
router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatars);
router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post("/verify", ctrl.verifyRepeated);

module.exports = router;
