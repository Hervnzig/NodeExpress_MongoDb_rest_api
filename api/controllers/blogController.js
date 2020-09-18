const { response } = require("../../middlewares/app");
// Add new blog
const Blog = require("../models/blog");
const store = (req, res, next) => {
  let blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    date: req.body.date,
  });
  if (req.file) {
    blog.image = req.file.path;
  }
  blog
    .save()
    .then((response) => {
      res.json({
        message: "Employee Added Successfully",
      });
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
};

module.exports = { store };
