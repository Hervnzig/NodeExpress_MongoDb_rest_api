const Blog = require("../models/blog");
const Comments = require("../models/comment");

// Middlewares
const cloud = require("../../middlewares/validations/cloudinaryConfig");
const fs = require("fs");

const retrieve = async (req, res, next) => {
  let blogs = await Blog.find()
    .select("title author content date image")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        blogs: docs.map((doc) => {
          return {
            id: doc._id,
            title: doc.title,
            author: doc.author,
            content: doc.content,
            date: doc.date,
            image: doc.image,
          };
        }),
      };
      res.status(200).json(response);
    });
};
const retrieveSingle = async (req, res, next) => {
  const id = req.params.blogId;
  try {
    let blog_w_comments = {};
    blog_w_comments.blog = await Blog.find({ _id: id });
    blog_w_comments.comments = await Comments.find({ blogId: id });
    res.status(200).json(blog_w_comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const create = async (req, res, next) => {
  const result = await cloud.uploads(req.files[0].path);

  let blogPost = {
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    date: req.body.date,
    image: result.url,
  };

  const blog = new Blog(blogPost);
  blog
    .save()
    .then((response) => {
      res.status(201).json({
        message: "=== blog created successfully :) ===",
        createdBlog: response,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
};

const remove = async (req, res, next) => {
  const blogId = req.params.blogId;
  await Blog.findByIdAndDelete(blogId)
    .exec()
    .then((result) => {
      res.status(200).json({
        message: `Blog deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

const update = async (req, res, next) => {
  const blogId = req.params.blogId;
  const updatedResult = await cloud.uploads(req.files[0].path);

  let updatedBlog = Blog.findByIdAndUpdate(blogId, {
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    image: updatedResult.url,
  });

  updatedBlog
    .exec()
    .then((result) => {
      res.status(200).json({
        message: `=== Blog with id ${blogId} updated successfully ===`,
        updated: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: `error: ${error}`,
      });
    });
  console.log(updatedBlog);
};

module.exports = {
  create,
  retrieve,
  retrieveSingle,
  remove,
  update,
};
