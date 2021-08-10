const { createUsers, srToken, flToken, wcToken } = require("./createUsers")
// const { createListings } = require("./createListings")
// const { createBookings } = require("./createBookings")
const db = require("../db.js")

const testListingIds = []
const testBookingIds = []
const testTokens = { srToken, flToken, wcToken }

async function commonBeforeAll() {
  // delete all current test data
  await db.query(`DELETE FROM saved_recipes`)
  await db.query(`DELETE FROM profile`)
  await db.query(`DELETE FROM users`)

  // insert fresh test data
  const userIds = await createUsers()
  // const listingIds = await createListings(userIds)

  // for (let i = 0; i < listingIds.length; i++) {
  //   testListingIds.push(listingIds[i])
  // }

  // const bookingIds = await createBookings(userIds, listingIds)

  // for (let i = 0; i < bookingIds.length; i++) {
  //   testBookingIds.push(bookingIds[i])
  // }
}

async function commonBeforeEach() {
  await db.query("BEGIN")
}

async function commonAfterEach() {
  await db.query("ROLLBACK")
}

async function commonAfterAll() {
  await db.end()
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  // testListingIds,
  // testBookingIds,
  testTokens,
}