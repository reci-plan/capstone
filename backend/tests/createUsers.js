const bcrypt = require("bcrypt")
const db = require("../db")
const tokens = require("../utils/tokens")
const { BCRYPT_WORK_FACTOR } = require("../config")

const createUsers = async () => {
  await db.query(`
    INSERT INTO users (username, first_name, last_name, email, password)
    VALUES (
      'sr',
      'Summer',
      'Rain',
      'summer@rain.io',
      '${await bcrypt.hash("pw", BCRYPT_WORK_FACTOR)}'
    ), (
      'fl',
      'Fall',
      'Leaves',
      'fall@leaves.io',
      '${await bcrypt.hash("pw2", BCRYPT_WORK_FACTOR)}'
    ), (
      'wc',
      'Winter',
      'Chill',
      'winter@chill.io',
      '${await bcrypt.hash("pw3", BCRYPT_WORK_FACTOR)}'
    );  
  `)

  const results = await db.query(`SELECT id FROM users ORDER BY id ASC`)

  const ids = results.rows.map((row) => row.id)
  return ids
}

const srToken = tokens.createUserJwt({ username: "sr" })
const flToken = tokens.createUserJwt({ username: "fl" })
const wcToken = tokens.createUserJwt({ username: "wc" })

module.exports = {
  createUsers,
  srToken,
  flToken,
  wcToken,
}