
require('dotenv').config()

const { Pool } = require('pg')

const connectionString = process.env.NODE_ENV === 'test'
    ? process.env.DB_TEST_URL
    : process.env.DB_URL

if (!connectionString) {
    throw new Error(
        `Database URL not found for NODE_ENV=${process.env.NODE_ENV}`
    )
}

const db = new Pool({
    connectionString
})

module.exports = db
