const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../../config");

const userSignUp = async (userDetails, role, res) => {
  try {
    // validate username
    let usernameNotTaken = await validateUsername(userDetails.username);
    if (!usernameNotTaken) {
      return res.status(500).json({
        message: `Username is already taken`,
        success: false,
      });
    }

    // validate emial
    let emailNotRegistered = await validateEmail(userDetails.email);
    if (!emailNotRegistered) {
      return res.status(500).json({
        message: `Email is already registered`,
        success: false,
      });
    }

    hashedPassword = await bcrypt.hash(userDetails.password, 10);

    const newUser = new User({
      ...userDetails,
      password: hashedPassword,
      role: role,
    });

    await newUser.save().then((result) => {
      console.log(result);
      res.status(201).json({
        message: "User created",
        result: result,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create user",
      error: error.message,
    });
  }
};

const userLogin = async (userCredentials, role, res) => {
  let { email, password } = userCredentials;

  // check if the username existst in db
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Email is not found. Invalid login credentials",
      success: false,
    });
  }

  if (user.role != role) {
    return res.status(403).json({
      message: "Please make sure you logging in from the right portal",
      success: false,
    });
  }

  if (user.email != email) {
    return res.status(401).json({
      message: "Authentication was bum!",
    });
  }

  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
      },
      JWT_KEY,
      { expiresIn: "7 days" }
    );
    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 200,
    };

    return res.status(200).json({
      message: "Horray you're logged in now :)",
      success: true,
      ...result,
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password",
      success: false,
    });
  }
};

const retriveUsers = async (req, res, next) => {
  await res.send("Hi");
};

const removeUser = async (req, res, next) => {
  const userId = req.params.userId;
  await User.findByIdAndDelete(userId)
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// validations
const validateUsername = async (username) => {
  let user = await User.findOne({ username });

  return user ? false : true;
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });

  return user ? false : true;
};

module.exports = { userSignUp, userLogin, retriveUsers, removeUser };
