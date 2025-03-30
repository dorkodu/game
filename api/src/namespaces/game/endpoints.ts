import { authOptionalProcedure, authRequiredProcedure, Router } from "@api/lib/trpc"
import { z } from "zod"
import { gameService } from "./service"

const helloSchema = z.object({ message: z.string() })

export const router = Router({
  "hello": authOptionalProcedure
    .input(helloSchema)
    .query((opts) =>
      `Hello, ${opts.input.message ?? "world"}!`
    ),
})

export * as gameEndpoints from "./endpoints"
