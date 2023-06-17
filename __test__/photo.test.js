const request = require("supertest")
const app = require("../app")
const { generateToken } = require("../helpers/jwt")
const { Photo, User } = require("../models")

describe("Testing Endpoint Photo", () => {
  let token
  let id
  let userId

  beforeAll(async () => {
    try {
      const user = await User.create({
        username: "imam",
        email: "imam@gmail.com",
        password: "123321",
      })

      token = await generateToken({
        id: user.id,
        email: user.email,
        username: user.username,
      })

      const photo = await Photo.create({
        title: "apaaja",
        caption: "apaaja",
        image_url: "apaaja",
        UserId: user.id,
      })
      id = photo.id
      userId = user.id
    } catch (err) {
      console.log(err)
    }
  })

  afterAll(async () => {
    try {
      await User.destroy({
        where: {},
      })

      await Photo.destroy({
        where: {},
      })
    } catch (err) {
      console.log(err)
    }
  })

  // Respon Sukses API CreatePhoto
  it("Response should 201", (done) => {
    request(app)
      .post("/photos")
      .set("token", token)
      .send({
        title: "apaaja",
        caption: "apaaja",
        image_url: "apaaja",
        UserId: userId,
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("id")
        expect(res.body).toHaveProperty("title")
        expect(res.body).toHaveProperty("caption")
        expect(res.body).toHaveProperty("image_url")
        expect(res.body).toHaveProperty("UserId")
        expect(res.body).toHaveProperty("updatedAt")
        expect(res.body).toHaveProperty("createdAt")
        done()
      })
  })

  // Respon Error tidak menyertakan Autentukasi API CreatePhoto
  it("Response should 401", (done) => {
    request(app)
      .post("/photos")
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("name")
        expect(res.body).toHaveProperty("message")
        done()
      })
  })

  // Respon sukses API GetAllPhotos
  it("Response should 200", (done) => {
    request(app)
      .get("/photos")
      .set("token", token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(typeof res.body).toEqual("object")
        expect(res.body[0]).toHaveProperty("id")
        expect(res.body[0]).toHaveProperty("title")
        expect(res.body[0]).toHaveProperty("caption")
        expect(res.body[0]).toHaveProperty("image_url")
        expect(res.body[0]).toHaveProperty("UserId")
        done()
      })
  })

  // Respon Error tidak menyertakan Autentikasi API GetAllPhotos
  it("Response should 401", (done) => {
    request(app)
      .get("/photos")
      .expect(401)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).toHaveProperty("name")
        expect(res.body).toHaveProperty("message")
        done()
      })
  })

  // Respon Sukses API GetPhotoByid
  it("Response should 200", (done) => {
    request(app)
      .get("/photos/" + id)
      .set("token", token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("id")
        expect(res.body).toHaveProperty("title")
        expect(res.body).toHaveProperty("caption")
        expect(res.body).toHaveProperty("image_url")
        expect(res.body).toHaveProperty("UserId")
        done()
      })
  })

  // Respon Error data not found GetPhotoById
  it("Response should 404", (done) => {
    request(app)
      .get("/photos/" + 7)
      .set("token", token)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toHaveProperty("name")
        expect(res.body).toHaveProperty("devMessage")
        done()
      })
  })
})
