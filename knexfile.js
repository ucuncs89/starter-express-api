require('dotenv').config()
const DB_CLIENT = process.env.DB_CLIENT || 'sqlite3'
if (DB_CLIENT !== 'sqlite3') {
  module.exports = {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/migrations'
    }
  }
} else {
  module.exports = {
    client: 'sqlite3', // or 'better-sqlite3'
    connection: {
      filename: './src/db/perdana.db'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/migrations'
    },
    useNullAsDefault: true
  }
}
