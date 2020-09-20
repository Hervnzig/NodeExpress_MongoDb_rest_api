const Blog = require("../models/blog");

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
  let blog = await Blog.findById(id)
    .exec()
    .then((doc) => {
      // console.log("### From database: ", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: `No valid entry found for id= ${id} ` });
      }
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({ error: err });
    });
};

const create = (req, res, next) => {
  let blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    date: req.body.date,
  });
  if (req.file) {
    console.log(req.file);
    blog.image = req.file.path;
  }
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

const update = (req, res, next) => {
  const blogId = req.params.blogId;

  let updatedBlog = Blog.findByIdAndUpdate(blogId, {
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    image: req.file.filename,
  });
  if (req.file) {
    updatedBlog.image = req.file.path;
  }
  updatedBlog
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
module.exports = { create, retrieve, retrieveSingle, remove, update };
