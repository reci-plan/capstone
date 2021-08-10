const request = require("supertest")
const app = require("../app")
const { 
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testTokens 
} = require("../tests/common")

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

/** GET saved recipes */
describe("GET save/recipes", () => {
  test("Authed user can access their saved recipes", async () => {
    const res = await request(app).get(`/save/recipes`).set("authorization", `Bearer ${testTokens.srToken}`)
    expect(res.statusCode).toEqual(200)
  })

  test("Unauthorized error when user is unauthenticated", async () => {
    const res = await request(app).get(`/save/recipes`)
    expect(res.statusCode).toEqual(401)
  })
})
