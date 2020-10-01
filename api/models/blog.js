const { model, Schema } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = model("Blog", blogSchema);
module.exports = Blog;

// comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
