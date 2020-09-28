const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    commentEmail: {
      type: String,
      required: true,
    },
    commentContent: {
      _id: mongoose.Schema.Types.ObjectId,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
