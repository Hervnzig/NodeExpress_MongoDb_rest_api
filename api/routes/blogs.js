const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
// const mongoose = require("mongoose");
// const formidable = require("formidable");

// router.get("/", async (req, res) => {
//   try {
//     const posts = await Blog.find().select(
//       "_id title author content date image"
//     );
//     if (!posts) throw Error("Somthing went wrong while getting the data");
//     res.status(200).json(posts);
//   } catch (error) {
//     console.log(err);
//     res.status(500).json({ error: err });
//   }
// });
const BlogController = require("../controllers/blogController");
const upload = require("../../middlewares/validations/upload");

router.get("/", async (req, res, next) => {
  //   res.send("Ok");
  const posts = await Blog.find();
  if (!posts) throw Error("Somthing went wrong while getting the data");
  res.status(200).json(posts);
});

router.post("/", upload.single("image"), BlogController.store);

module.exports = router;
