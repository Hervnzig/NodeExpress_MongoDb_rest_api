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

/**
 * @swagger
 * /blogs:
 *   get:
 *     description: Get all blogs
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get("/", BlogController.retrieve);

/**
 * @swagger
 * /blogs/:id:
 *   get:
 *     description: Get single blog
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get("/:blogId", BlogController.retrieveSingle);

/**
 * @swagger
 * /blogs:
 *  post:
 *    description: Use to add a blog in the DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Add blog
 *        description: Add food in DB.
 *        schema:
 *          type: object
 *          required:
 *            - foodName
 *            - quantity
 *          properties:
 *            foodName:
 *              type: string
 *            quantity:
 *              type: string
 *            createTillNow:
 *              type: string
 *            predicted:
 *              type: string
 *            status:
 *              type: string
 *    responses:
 *      '200':
 *        description: Food added successfully.
 */
router.post("/", checkAuth, multerConfig, BlogController.create);
router.patch("/:blogId", checkAuth, multerConfig, BlogController.update);
router.delete("/:blogId", checkAuth, BlogController.remove);

module.exports = router;
