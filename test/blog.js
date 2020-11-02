let chai = require("chai");
let server = require("../server");
let chaiHttp = require("chai-http");
const Blog = require("../api/models/blog");
const cloud = require("../middlewares/validations/cloudinaryConfig");

// Assertion stlyle
chai.should();

chai.use(chaiHttp);

describe("Blogs API", () => {
  const jwt_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWY5NjYzZWMyOWZhMzEwMDA0NTUzMGU4Iiwicm9sZSI6ImFkbWluIiwidXNlcm5hbWUiOiJoZXJ2ZV9hZG1pbiIsImVtYWlsIjoiYWRtaW5IZXJ2ZUBnbWFpbC5jb20iLCJpYXQiOjE2MDM2OTE1MTgsImV4cCI6MTYwNDI5NjMxOH0.YEB6RMtWuGDVViyU8xIH8C-iP42bXO3baBjfD3xcFv8";
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

  describe("PATCH/blogs/:blogID", () => {
    const blogID = "5f7741cc71df934ce4c7bcd0";
    const newArticle = {
      title: "Messi or Ronaldihno",
      author: "Football_addict",
      content:
        "Leo Messi might have the most success with Barcelona but Ronaldhino has been the one to lay foundation.",
      image: "images/encryption.png",
    };

    it("it should UPDATE a blog given by the id", async (done) => {
      chai
        .request(server)
        .patch("/blogs/" + blogID)
        .set("Authorization", `Bearer ${jwt_token}`)
        .send(newArticle)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");

          done();
        });
    });
  });

  /**
   * Test the DELETE route
   */

  describe("DELETE /blogs/:blogID", () => {
    it("it should DELETE a blog given the id", (done) => {
      const blog_id = "5f77501df933490004892b7f";
      chai
        .request(server)
        .delete("/blogs/" + blog_id)
        .set({ Authorization: `Bearer ${jwt_token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
