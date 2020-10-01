// const User = require("../api/models/user");

// const validateUsername = async (username) => {
//   let user = await User.findOne({ username });

//   return user ? false : true;
// };

// const validateemail = async (email) => {
//   let user = await User.findOne({ email });

//   return user ? false : true;
// };
///
////
///

//========= // To be REUSED IN CASE
// const loginUser = (req, res, next) => {
//   User.find({ email: req.body.email })
//     .exec()
//     .then((user) => {
//       if (user.length < 1) {
//         return res.status(401).json({
//           message: "Authentication failed",
//         });
//       }
//       bcrypt.compare(req.body.password, user[0].password, (err, response) => {
//         if (err) {
//           return res.status(401).json({
//             message: "Auth failed",
//           });
//         }
//         if (response) {
//           const token = jwt.sign(
//             {
//               email: user[0].email,
//               userId: user[0]._id,
//             },
//             JWT_KEY,
//             {
//               expiresIn: "1h",
//             }
//           );
//           return res.status(200).json({
//             message: "Auth successful",
//             token: token,
//           });
//         }
//         res.status(401).json({
//           message: "Authentication failed",
//         });
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: err,
//       });
//     });
// };
///
///
///
// const signup = (req, res, next) => {
//   User.find({ email: req.body.email })
//     .exec()
//     .then((user) => {
//       if (user.length >= 1) {
//         return res.status(409).json({
//           message: "Email exists already",
//         });
//       } else {
//         bcrypt.hash(req.body.password, 10, (err, hash) => {
//           if (err) {
//             return res.status(500).json({
//               error: "There is an error",
//             });
//           } else {
//             const user = new User({
//               fullNames: req.body.fullNames,
//               username: req.body.username,
//               email: req.body.email,
//               password: hash,
//             });
//             user
//               .save()
//               .then((result) => {
//                 console.log(result);
//                 res.status(201).json({
//                   message: "User created",
//                   result: result,
//                 });
//               })
//               .catch((err) => {
//                 console.log(err);
//                 res.status(500).json({
//                   error: err,
//                 });
//               });
//           }
//         });
//       }
//     })
//     .catch();
// };
