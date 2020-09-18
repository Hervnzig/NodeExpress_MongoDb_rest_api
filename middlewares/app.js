const express = require("express");
const app = express();

const blogRoutes = require("../api/routes/blogs");
// const userRoutes;
// const commentRoutes;

app.use("/blogs", blogRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 406);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
