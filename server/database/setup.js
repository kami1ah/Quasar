require('dotenv').config()
const fs = require('fs')

const db = require('./connect')

const sqlFile = process.env.NODE_ENV === 'test'
    ? '../__tests__/integration/reset.sql'
    : 'games.sql'

const sql = fs.readFileSync(__dirname + '/' + sqlFile, 'utf8')

async function setup() {
    try {
        console.log('NODE_ENV:', process.env.NODE_ENV)
        console.log('Executing:', sqlFile)

        const result = await db.query(`
            SELECT current_database(), current_user
        `)

        console.log('Connected to:', result.rows[0])

        await db.query(sql)

        console.log('Setup complete')
    } catch (error) {
        console.error('Setup failed:', error)
        process.exitCode = 1
    } finally {
        await db.end()
    }
}

setup()