const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const userData = {
  email: "user-pertama@gmail.com",
  username: "user_pertama",
  password: "123321",
};

// Testing Register User
describe("POST /users/register", () => {
  it("should send response with 201 status code", (done) => {
    request(app)
      .post("/users/register")
      .send(userData)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        expect(res.status).toEqual(201);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("username");
        expect(res.body).toHaveProperty("email");
        expect(res.body.username).toEqual(userData.username);
        expect(res.body.email).toEqual(userData.email);
        done();
      });
  });
});

// Testing Login User
describe("POST /users/login", () => {
  it("should send response with 200 status code", (done) => {
    request(app)
      .post("/users/login")
      .send(userData)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        expect(res.status).toEqual(200);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("token");
        expect(typeof res.body.token).toEqual("string");
        done();
      });
  });
});

const wrongUser = {
  username: "wrong_user",
  email: "wronguser@gmail.com",
  password: "123456",
};

// Testing Login User
describe("POST /users/login", () => {
  it("should send response with 401 status code", (done) => {
    request(app)
      .post("/users/login")
      .send(wrongUser)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        expect(res.status).toEqual(401);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("devMessage");
        expect(res.body.name).toEqual("User Login Error");
        done();
      });
  });
});

// After All Testing
afterAll((done) => {
  sequelize.queryInterface
    .bulkDelete("Users", {})
    .then(() => {
      return done();
    })
    .catch((err) => {
      done(err);
    });
});
