const express = require("express");
const router = express.Router();

const { userSignUp, userLogin } = require("../controllers/userController");

// Handle incoming requests from /user
// router.post("/signup", UserController.signup);

// router.get("/", UserController.retriveUsers);
// router.post("/login", UserController.loginUser);
// router.delete("/:userId", UserController.removeUser);

router.post("/register-user", async (req, res) => {
  await userSignUp(req.body, "user", res);
});

router.post("/register-admin", async (req, res) => {
  await userSignUp(req.body, "admin", res);
});

router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});

router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

module.exports = router;
