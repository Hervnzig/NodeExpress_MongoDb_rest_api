const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    blogId: {
      type: String,
      required: true,
    },
    authEmail: {
      type: String,
      required: true,
    },
    commentContent: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comments", commentSchema);
module.exports = Comment;
