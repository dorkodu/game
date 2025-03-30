export const defaultAvatarUrl = '/images/avatar.webp'

export const port = Number(import.meta.env.VITE_PORT) || 8000
export const dev = import.meta.env.MODE === "development"
export const prod = import.meta.env.MODE === "production"

export const origin = import.meta.env.VITE_ORIGIN || "http://localhost:5173"

export const trpcApiUrl = dev ? "http://localhost:8000/trpc" : "https://api.trekie.io/trpc"

export * as config from "./config"
