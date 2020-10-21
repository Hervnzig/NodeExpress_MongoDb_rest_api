const app = require("./middlewares/app");
const mongoose = require("mongoose");
const { MONGO_URL, MONGO_URL_TEST } = require("./config");
// const http = require("http");

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

// ### Setting up server
const Port = process.env.PORT || 5000;

// const server = http.createServer(app);
app.listen(Port, (err) => {
  if (err) {
    console.log(`||| server error at port ${Port} |||`);
  } else {
    console.log(`Server running at port ${Port}`);
  }
});

module.exports = app;
