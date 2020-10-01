const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    // console.log(token);
    const decodedToken = jwt.verify(token, JWT_KEY, null);
    req.userData = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Authentication failed!!!!!!!!!!",
    });
  }
};
