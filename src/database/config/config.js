require('dotenv').config();

module.exports = {
  development: {
    databaseUrl: process.env.DATABASE_URL,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    use_env_variable: 'DATABASE_URL',
    dialect: process.env.DB_DIALECT || 'postgres'
  },
  test: {
    databaseUrl: process.env.DATABASE_URL,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    use_env_variable: 'DATABASE_URL',
    dialect: process.env.DB_DIALECT || 'postgres'
  },
  production: {
    databaseUrl: process.env.DATABASE_URL,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    use_env_variable: 'DATABASE_URL',
    dialect: process.env.DB_DIALECT || 'postgres'
  }
}
