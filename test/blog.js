let chai = require("chai");
let server = require("../server");
let chaiHttp = require("chai-http");

// Assertion stlyle
chai.should();

chai.use(chaiHttp);

describe("Blogs API", () => {
  /**
   * Test the GET route
   */
  describe("GET /blogs", () => {
    it("It should get all the blogs", (done) => {
      chai
        .request(server)
        .get("/blogs")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          // response.body.length.should.be.eq(10);
          done();
        });
    });

    it("It should NOT get all the blogs", (done) => {
      chai
        .request(server)
        .get("/blog")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });

    // it("It should get the root content", (done) => {
    //   chai
    //     .request(server)
    //     .get("/")
    //     .end((err, response) => {
    //       response.should.have.status(200);
    //       response.body.should.have
    //         .property("message")
    //         .eql(
    //           "Welcome to my login add /user/login-user, for signup add a user/register-user/"
    //         );
    //       done();
    //     });
    // });
  });

  /**
   * Test the GET {by id} route
   */

  describe("GET /blogs/blogID", () => {
    it("It should get a single blog by ID", (done) => {
      const blogID = "5f77501df933490004892b7f";
      chai
        .request(server)
        .get("/blogs/" + blogID)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.an("object");
          done();
        });
    });

    // Test to get single student record
    it("It should not get a single blog record", (done) => {
      const blogID = 5;
      chai
        .request(server)
        .get(`/blogs/${blogID}`)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the POST route
   */
  /**
   * Test the PATCH route
   */
  /**
   * Test the DELETE route
   */
  /**
   * Test the PUT route
   */
});
