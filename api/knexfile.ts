import type { Knex } from "knex"
const config = require("./src/config")

// Update with your config settings.

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host: config.postgresHost,
      port: config.postgresPort,
      user: config.postgresUser,
      password: config.postgresPassword,
      database: config.postgresDatabase,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  //staging: {
  //  client: "postgresql",
  //  connection: {
  //    database: "my_db",
  //    user: "username",
  //    password: "password",
  //  },
  //  pool: {
  //    min: 2,
  //    max: 10,
  //  },
  //  migrations: {
  //    tableName: "knex_migrations",
  //  },
  //},

  production: {
    client: "postgresql",
    connection: {
      host: config.postgresHost,
      port: config.postgresPort,
      user: config.postgresUser,
      password: config.postgresPassword,
      database: config.postgresDatabase,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
}

export default knexConfig