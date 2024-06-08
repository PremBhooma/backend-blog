const express = require("express");
const router = express.Router();
const Controller = require("../controller/User.controller");

router.post("/create", Controller.createUser);
router.post("/login", Controller.userLogin);

module.exports = router;
