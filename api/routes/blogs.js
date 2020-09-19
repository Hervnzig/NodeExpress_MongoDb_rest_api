const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

// Middlewares
const BlogController = require("../controllers/blogController");
const upload = require("../../middlewares/validations/upload");

// ROUTE CONTROLLERS
router.get("/", BlogController.retrieve);
router.get("/:blogId", BlogController.retrieveSingle);
router.post("/", upload.single("image"), BlogController.create);
router.patch("/:blogId", upload.single("image"), BlogController.update);
router.delete("/:blogId", BlogController.remove);

module.exports = router;
