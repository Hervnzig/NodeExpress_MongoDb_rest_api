const User = require("../models/user-role-based");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../../config");

/**
 * To register the user (ADMIN, SUPER_ADMiN, USER)
 */

const userRegister = async (userDetails, role, res) => {
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
    let emailNotRegistered = await validateemail(userDetails.email);
    if (!emailNotRegistered) {
      return res.status(500).json({
        message: `Email is already registered`,
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(userDetails.password, 12);

    const newUser = new User({
      ...userDetails,
      password: hashedPassword,
      role: role,
    });

    await newUser.save();
    return res.status(201).json({
      message: "User created",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create user",
      error: error,
    });
  }
};

const userLogin = async (userCredentials, role, res) => {
  let { username, password } = userCredentials;

  // check if the username existst in db
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      message: "Username is not found. Invalid login credentials",
      success: false,
    });
  }

  if (user.role != role) {
    return res.status(403).json({
      message: "Please make sure you logging in from the right portal",
      success: false,
    });
  }

  // Password check
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
      ...result,
      message: "Horray you're logged in now :)",
      success: true,
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password",
      success: false,
    });
  }
};

const validateUsername = async (username) => {
  let user = await User.findOne({ username });

  return user ? false : true;
};

const validateemail = async (email) => {
  let user = await User.findOne({ email });

  return user ? false : true;
};

module.exports = { userRegister, userLogin };
