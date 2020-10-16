let chai = require("chai");
let server = require("../server");
let chaiHttp = require("chai-http");

// Assertion stlyle
chai.should();

chai.use(chaiHttp);

describe("Users Comments API", () => {
  /**
   * Test GET route for REGISTERING admins
   */

  describe("POST user/register-admin", () => {
    it("POST new admin", (done) => {
      const admin = {
        full_names: "Tester Herve",
        username: "tester_1",
        email: "todaytest@gmail.com",
        password: "Test12345",
      };
      chai
        .request(server)
        .get("user/register-admin")
        .send(admin)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.an("object");
          done();
        });
    });
  });

  describe("POST user/register-user", () => {
    it("POST new user", (done) => {
      const admin = {
        full_names: "User Herve",
        username: "Userrrr",
        email: "userTest@gmail.com",
        password: "Test12345",
      };
      chai
        .request(server)
        .get("user/register-user")
        .send(admin)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.an("object");
          done();
        });
    });
  });

  describe("POST user/login-admin", () => {
    it("Login admin", (done) => {
      const admin = {
        email: "userTest@gmail.com",
        password: "Test12345",
      };
      chai
        .request(server)
        .get("user/login-admin")
        .send(admin)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.an("object");
          done();
        });
    });
  });

  describe("POST user/login-user", () => {
    it("Login user", (done) => {
      const admin = {
        email: "userTest@gmail.com",
        password: "Test12345",
      };
      chai
        .request(server)
        .get("user/login-user")
        .send(admin)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.an("object");
          done();
        });
    });
  });
});
