const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../../controllers");
const auth = require("../../middlewares/auth");

router.post("/register", ctrl.register);
router.post("/login", ctrl.loginUser);
router.get("/current", auth, ctrl.current);
router.post("/logout", auth, ctrl.logOut);
router.patch("/subscription", auth, ctrl.updateSubscription);

module.exports = router;
