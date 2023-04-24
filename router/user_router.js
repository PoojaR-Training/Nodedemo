const userController = require("../controller/user-controller");

const express = require("express");
const router = express.Router();

router.post("/login", userController.userLogin);
router.post("/register", userController.userRegister);
module.exports = router;