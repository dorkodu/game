import type { Knex } from "knex"


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("users", (t) => {
      // account
      t.specificType("id", "bytea").primary()
      t.specificType("username", "varchar(16)").notNullable()
      t.specificType("name", "varchar(48)").notNullable()
      t.specificType("email", "varchar(320)").notNullable()
      t.specificType("joined_at", "int8").notNullable()
      t.specificType("birth_date", "int8").notNullable()
      // subscription 
      t.specificType("tier", "smallint").notNullable()
      // profile
      t.specificType("bio", "varchar(500)").notNullable()
      t.specificType("picture_url", "varchar(300)").notNullable()
      t.specificType("location", "varchar(100)").notNullable()
      t.specificType("url", "varchar(300)").notNullable()
    })

    .raw("CREATE UNIQUE INDEX users_username_index ON users (LOWER(username))")

    .createTable("sessions", (t) => {
      t.specificType("id", "bytea").primary()
      t.specificType("user_id", "bytea").notNullable()
      t.specificType("selector", "bytea").notNullable()
      t.specificType("validator", "bytea").notNullable()
      t.specificType("created_at", "int8").notNullable()
      t.specificType("expires_at", "int8").notNullable()
      t.index(["user_id"], undefined, "hash")
      t.unique(["selector"], undefined)
    })

    .createTable("oauth_google_accounts", (t) => {
      t.specificType("id", "bytea").primary()
      t.specificType("user_id", "bytea").notNullable()
      t.specificType("oauth_id", "text").notNullable()
      t.specificType("email", "varchar(320)").notNullable()
      t.specificType("connected_at", "int8").notNullable()

      t.index(["user_id"], undefined, "hash")
      t.unique(["oauth_id"], undefined)
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable("users")
    .dropTable("sessions")
    .dropTable("oauth_google_accounts")
}

