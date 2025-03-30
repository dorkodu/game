import { config } from "@api/config"
import postgres from "postgres"

export const pg = postgres({
  host: config.postgresHost,
  port: config.postgresPort,
  user: config.postgresUser,
  password: config.postgresPassword,
  database: config.postgresDatabase,
  transform: postgres.camel,
})

/* 
  Berk, [5/3/24 4:15 PM]

  const [result]: [{createdAt:number}?] = await pg`SELECT created_at FROM users WHERE id=31`
  result?.createdAt

  Berk, [5/3/24 4:17 PM]
  
  const row = { id: "31", createdAt: Date.now() }
  const result = await pg`INSERT INTO users ${row}`
  result.count === 0 // error happened

  Berk, [5/3/24 4:19 PM]  

  const { name } = req.body;
  const userId = getUserIdFromCookie(req)
  const result = await pg`
    UPDATE FROM users 
    SET name=${name} 
    WHERE id=${userId}
  `
 */