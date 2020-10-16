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

const getAllComments = async (req, res) => {
  const comment = await Comment.find()
    .select("_id authEmail commentContent blogId")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        comments: docs.map((doc) => {
          return {
            id: doc._id,
            authEmail: doc.authEmail,
            commentContent: doc.commentContent,
            blogId: doc.blogId,
          };
        }),
      };
      res.status(200).json(response);
      // console.log(response);
    });
};

module.exports = { postComment, getAllComments };
