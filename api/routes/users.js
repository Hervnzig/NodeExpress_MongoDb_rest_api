const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");

router.post("/signup", UserController.signup);
router.get("/", UserController.retriveUsers);
router.delete("/:userId", UserController.removeUser);

module.exports = router;
