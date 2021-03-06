const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

// Middlewares and
const checkAuth = require("../../middlewares/check-auth");
const upload = require("../../middlewares/validations/upload");
const multerConfig = require("../../middlewares/validations/multerConfig");

// Controller for /blogs
const BlogController = require("../controllers/blogController");
const CommentController = require("../controllers/commentController");

// Handle incoming requests to /blogs
router.get("/", BlogController.retrieve);
router.get("/:blogId", BlogController.retrieveSingle);
router.post("/", checkAuth, multerConfig, BlogController.create);
router.patch("/:blogId", checkAuth, multerConfig, BlogController.update);
router.delete("/:blogId", checkAuth, BlogController.remove);

module.exports = router;
