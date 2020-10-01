const Comment = require("../models/comment");
const Blog = require("../models/blog");
// const { response } = require("express");

const postComment = async (req, res) => {
  const blogId = req.params.blogId;
  console.log(blogId);

  await Blog.findById(req.params.blogId, (err, blog) => {
    if (!blog) {
      return res.status(500).json({
        message: "That blog doesn't exist",
      });
    } else {
      const comment = new Comment({
        authEmail: req.body.authEmail,
        commentContent: req.body.commentContent,
        blogId: blogId,
      });
      console.log(blogId);
      console.log(comment);

      comment
        .save()
        .then((response) => {
          res.status(201).json({
            message: `comment for blog with id ${blogId}`,
            createdComment: response,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: err,
          });
        });
    }
  });
};

module.exports = { postComment };
