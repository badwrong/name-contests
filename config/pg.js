module.exports = {
  development: {
    database: 'contests'
  },
  production: {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    host: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
  }
};
