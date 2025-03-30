import { Router } from "@api/lib/trpc"
import { gameEndpoints } from "./namespaces/game/endpoints"

export const appRouter = Router({
  game: gameEndpoints.router,
})

export type AppRouter = typeof appRouter
