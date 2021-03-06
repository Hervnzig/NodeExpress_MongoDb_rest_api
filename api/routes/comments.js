const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/commentController");

router.post("/:blogId/comments", CommentController.postComment);
router.get("/user/admin/comments", CommentController.getAllComments);
module.exports = router;
