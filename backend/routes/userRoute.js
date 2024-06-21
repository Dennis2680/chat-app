const express = require("express");
const { registerUser, userLogin, findUser, getAllUsers } = require("../controllers/userController");

const router = express.Router();

router.post("/registration", registerUser);
router.post("/login", userLogin);
router.get("/find/:userId", findUser);
router.get("/", getAllUsers);

module.exports = router;
