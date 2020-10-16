let chai = require("chai");
let server = require("../server");
let chaiHttp = require("chai-http");
const Blog = require("../api/models/blog");
const Comment = require("../api/models/comment");

// Assertion stlyle
chai.should();

chai.use(chaiHttp);

describe("Blog Comments API", () => {
  /**
   * Test GET route for all comments
   */

  describe("GET /blogs/user/admin/comments", () => {
    it("It should GET all the comments", (done) => {
      chai
        .request(server)
        .get("/blogs/user/admin/comments")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });

    it("It should NOT get all comments", (done) => {
      chai
        .request(server)
        .get("/blogs/user/admin/comment")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
    it("It should NOT get all comments", (done) => {
      chai
        .request(server)
        .get("/blogs/user/comments")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
    it("It should NOT get all comments", (done) => {
      chai
        .request(server)
        .get("blogs/comments")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
    it("It should NOT get all comments", (done) => {
      chai
        .request(server)
        .get("/comments")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe("POST blogs/:blogID/comments", () => {
    it("We should POST a new comment on a post", (done) => {
      const blogID = "5f774ff7f933490004892b7e";
      const comment = {
        authEmail: "hmusangwa@gmail.com",
        commentContent: "commenting on a test",
      };
      chai
        .request(server)
        .get("blogs/" + blogID + "/comments")
        .send(comment)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.an("object");
          done();
        });
    });
  });
});
