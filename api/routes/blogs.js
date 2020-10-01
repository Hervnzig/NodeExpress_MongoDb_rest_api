const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

// Middlewares and
const checkAuth = require("../../middlewares/check-auth");
const upload = require("../../middlewares/validations/upload");

// Controller for /blogs
const BlogController = require("../controllers/blogController");
const CommentController = require("../controllers/commentController");

// Handle incoming requests to /blogs
router.get("/", BlogController.retrieveWholeBlog);
router.get("/:blogId", BlogController.retrieveSingle);
router.post("/", checkAuth, upload.single("image"), BlogController.create);
router.patch(
  "/:blogId",
  checkAuth,
  upload.single("image"),
  BlogController.update
);
router.delete("/:blogId", checkAuth, BlogController.remove);

module.exports = router;
