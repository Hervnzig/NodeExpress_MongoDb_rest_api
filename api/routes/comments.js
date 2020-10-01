const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/commentController");

router.post("/:blogId/comments", CommentController.postComment);
module.exports = router;
