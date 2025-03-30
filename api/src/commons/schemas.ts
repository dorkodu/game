import { z } from "zod"

export const id = z.string().ulid()
export const direction = z.enum(["forward", "backward"])

export const name = z
  .string()
  .trim()
  .min(1, "Name must be minimum 1 character.")
  .max(64, "Name must be maximum 64 characters.")

/**
 * Regex error message is stripped down to be easier to understand.
 * min() & max() statements come last so they are checked first.
 */
export const username = z
  .string()
  .trim()
  .regex(
    /^(?![_.])(?!.*[_.]{2})([a-zA-Z0-9_.]{1,16})(?<![_.])$/,
    "Username can only contain letters or numbers."
  )
  .min(1, "Name must be minimum 1 character.")
  .max(16, "Name must be maximum 16 characters.")

export const email = z.string().trim().email().max(320)

export const password = z
  .string()
  .min(8, "Password must be minimum 8 characters.")

//#region General
export const title = z
  .string()
  .trim()
  .min(1, "Title must be minimum 1 character.")
  .max(100, "Title must be maximum 100 characters.")
//#endregion

//#region Deck
export const q = z
  .string()
  .trim()
  .min(1, "Question must be minimum 1 character.")
  .max(100, "Question must be maximum 100 characters.")

export const a = z
  .string()
  .trim()
  .min(1, "Answer must be minimum 1 character.")
  .max(200, "Answer must be maximum 200 characters.")
//#endregion

//#region Utility
export const order = z.number().int().min(0).max(Number.MAX_SAFE_INTEGER)
//#endregion

export * as commonSchemas from "./schemas"

