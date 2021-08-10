const request = require("supertest")
const app = require("../app")
const { srToken, wcToken, flToken } = require("../tests/createUsers")

/** GET saved recipes */
describe("GET save/recipes", () => {
  test("Authed user can access their saved recipes", async () => {
    const res = await request(app).get(`/save/recipes`).set("authorization", `Bearer ${srToken}`)
    expect(res.statusCode).toEqual(200)
  })

  test("Unauthorized error when user is unauthenticated", async () => {
    const res = await request(app).get(`/save/recipes`)
    expect(res.statusCode).toEqual(401)
  })
})

afterEach(done => {
  done();
})