const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/commentController");

router.post("/:blogId/comments", CommentController.postComment);

/**
 * @swagger
 * /user/admin/comments:
 *   get:
 *     description: Get all comments
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get("/user/admin/comments", CommentController.getAllComments);
module.exports = router;
