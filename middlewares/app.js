const express = require("express");
const app = express();
const morgan = require("morgan");

const userRoutes = require("../api/routes/users");
const blogRoutes = require("../api/routes/blogs");
const commentRoutes = require("../api/routes/comments");

app.use(express.json());
app.use(morgan("dev"));

// === ROUTES ===
app.get("/", (req, res, next) => {
  res.status(200).json({
    message:
      "Welcome to my login add /user/login-user, for signup add a user/register-user/",
  });
});

app.use("/user", userRoutes);
app.use("/blogs", blogRoutes);
app.use("/blogs", commentRoutes);

// Swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const SwaggerOptions = require("../swagger/swagger.json");

const swaggerDocument = swaggerJsDoc(SwaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use("/uploads", express.static("uploads"));

// =======
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});
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
