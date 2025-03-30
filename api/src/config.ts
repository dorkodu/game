export const port = Number(process.env.PORT) || 8000
export const dev = process.env.BUN_ENV !== "production"
export const prod = process.env.BUN_ENV === "production"
export const origin = process.env.ORIGIN || "http://localhost:5173"

export const postgresHost = process.env.POSTGRES_HOST || "localhost"
export const postgresPort = Number(process.env.POSTGRES_PORT) || 5432
export const postgresDatabase = process.env.POSTGRES_DB || "postgres"
export const postgresUser = process.env.POSTGRES_USER || "postgres"
export const postgresPassword = process.env.POSTGRES_PASSWORD || "postgres"

export const smtpHost = process.env.SMTP_HOST || ""
export const smtpPort = Number(process.env.SMTP_PORT) || 587
export const smtpUser = process.env.SMTP_USER || ""
export const smtpPassword = process.env.SMTP_PASSWORD || ""

export const googleClientId = process.env.GOOGLE_CLIENT_ID || ""
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || ""

export * as config from "./config"

