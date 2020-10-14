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

    it("It should get", (done) => {
      chai
        .request(server)
        .get("/")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have
            .property("message")
            .eql(
              "Welcome to my login add /user/login-user, for signup add a user/register-user/"
            );
          done();
        });
    });
  });

  /**
   * Test the GET {by id} route
   */
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
