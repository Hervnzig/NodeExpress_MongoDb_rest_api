let chai = require("chai");
let server = require("../server");
let chaiHttp = require("chai-http");
const Blog = require("../api/models/blog");
const cloud = require("../middlewares/validations/cloudinaryConfig");

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
  });

  /**
   * Test the GET {by id} route
   */

  describe("GET /blogs/:blogID", () => {
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
  describe("POST /blogs", () => {
    it("It should POST a new blog", (done) => {
      const blog = {
        title: "mocha chai tests",
        author: "Herve",
        content: "creating test mocha chai",
        image: "/home/nzigira/Documents/vpn/signature.png",
      };
      chai
        .request(server)
        .get("/blogs")
        .send(blog)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.an("object");
          done();
        });
    });
  });

  /**
   * Test the PATCH route
   */

  // describe("PATCH blogs/:blogID", () => {
  //   it("it should UPDATE a blog given by the id", async (done) => {
  //     const id = "5f77501df933490004892b7f";
  //     const token =
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWY4OTQzNmM0M2Y1YzUxMDk0MTZiYjY3Iiwicm9sZSI6ImFkbWluIiwidXNlcm5hbWUiOiJ0ZXN0ZXJfMSIsImVtYWlsIjoidG9kYXl0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTYwMjgzMTIzNywiZXhwIjoxNjAzNDM2MDM3fQ.LJgxzzMbP9dxvYnON3u8gbQNkj_wEdn251IJoVQmrYg";
  //     const single_blog = {
  //       title: "Mocha chai",
  //       image: "updatedResult.url",
  //     };
  //     chai
  //       .request(server)
  //       .patch("/blogs/" + id)
  //       .set("Authorization", `Bearer ${token}`)
  //       .send(single_blog)
  //       .end((error, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a("object");

  //         done();
  //       });
  //   });
  // });

  /**
   * Test the DELETE route
   */

  describe("DELETE /blogs/:blogID", () => {
    it("it should DELETE a blog given the id", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWY4OTQzNmM0M2Y1YzUxMDk0MTZiYjY3Iiwicm9sZSI6ImFkbWluIiwidXNlcm5hbWUiOiJ0ZXN0ZXJfMSIsImVtYWlsIjoidG9kYXl0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTYwMjgzMTIzNywiZXhwIjoxNjAzNDM2MDM3fQ.LJgxzzMbP9dxvYnON3u8gbQNkj_wEdn251IJoVQmrYg";
      const blog_id = "5f77501df933490004892b7f";
      chai
        .request(server)
        .delete("/blogs/" + blog_id)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          // res.body.should.have
          //   .property("message")
          //   .to.be.eql("Blog successfully deleted!");
          done();
        });
    });
  });
});
