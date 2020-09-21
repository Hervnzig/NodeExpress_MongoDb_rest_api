const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");

// Handle incoming requests from /user
router.post("/signup", UserController.signup);
router.get("/", UserController.retriveUsers);
router.post("/login", UserController.loginUser);
router.delete("/:userId", UserController.removeUser);

module.exports = router;
