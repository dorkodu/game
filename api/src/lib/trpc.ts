import { authRepository } from "@api/namespaces/auth/repository"
import { tokenUtil } from "@api/namespaces/auth/token-util"
import { initTRPC, TRPCError } from "@trpc/server"
import type { Request, Response } from "express"

interface Context {
  req: Request
  res: Response

  session?: Promise<{ id: string; userId: string } | undefined>
}

const t = initTRPC.context<Context>().create()

export const Router = t.router
export const publicProcedure = t.procedure

export const authRequiredProcedure = publicProcedure.use(async (opts) => {
  const token = tokenUtil.getSession(opts.ctx.req)
  if (!token) throw new TRPCError({ code: "UNAUTHORIZED" })

  if (opts.ctx.session === undefined) {
    opts.ctx.session = authRepository.getSessionByToken(token)
  }

  const session = await opts.ctx.session
  if (!session) throw new TRPCError({ code: "UNAUTHORIZED" })

  return opts.next({ ctx: { session } })
})

export const authOptionalProcedure = publicProcedure.use(async (opts) => {
  if (opts.ctx.session === undefined) {
    const token = tokenUtil.getSession(opts.ctx.req)
    if (token) opts.ctx.session = authRepository.getSessionByToken(token)
  }

  const session = await opts.ctx.session

  return opts.next({ ctx: { session } })
})
