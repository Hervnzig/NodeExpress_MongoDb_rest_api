const mongoose = require("mongoose");
const blogSchema = mongoose.Schema({
  //   _id: mongoose.Schema.Types.ObjectId,
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
  date: {
    type: String,
    default: Date.now,
  },
  image: {
    type: String,
    required: true,
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
