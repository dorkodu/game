/**
 *  We need to track results on function calls
 *  If we encounter an error, function will ,fail and call this handler with the error  
 */

import { LogKind, log, reportToRemote } from "@web/lib/utils/log"
import { ErrorInfo } from "react"
import { notifications } from "./notifications"

/**
 * Global error handler of our application
 */
export function globalErrorHandler(error: Error) {
  log(error, LogKind.ERROR)

  if (import.meta.env.PROD) {
    reportToRemote(error)
  }
}

export function onError(error: Error, info: ErrorInfo) {
  // Do something with the error, e.g. log to an external API
  globalErrorHandler(error)
}

export function onReset() {
  // Reset the state of your app so the error doesn't happen again
}

export interface AppError {
  code: string,
  message: string,
  action: (e?: Error, data?: any) => void
}

export const AppError = (e: AppError) => e

export function handle(code: Kind, e?: Error, data?: any) {
  const error = kinds[code]
  if (error)
    error.action(e, data)
}

export type Kind = keyof typeof kinds
export const kinds = {
  UNKNOWN_ERROR: AppError({
    code: "UNKNOWN_ERROR",
    message: "An unknown error occured. Please try again or restart the application.",
    action(err, data) {
      log("Unknown Error: " + err, LogKind.ERROR)
      notifications.error("Error", this.message)
    }
  }),
  NO_SESSION: AppError({
    code: "NO_SESSION",
    message: "No active user session found. Please login first.",
    action(err, data) {
      notifications.error("No Active User", this.message)
    }
  }),
  ITEM_NOT_FOUND: AppError({
    code: "ITEM_NOT_FOUND",
    message: "You tried something on a thing that does not exist.",
    action(err, data) {
      notifications.error("Thing Not Found", this.message)
    }
  }),
  NOT_AUTHORIZED: AppError({
    code: "NOT_AUTHORIZED",
    message: "You don't have permissions for this action.",
    action(err, data) {
      notifications.error("Not Authorized", this.message)
    }
  }),
  INDEXEDDB_ERROR: AppError({
    code: "INDEXEDDB_ERROR",
    message: "An error occured with local IndexedDB.",
    action(err, data) {
      log("IndexedDB Error: " + err, LogKind.ERROR)
    }
  }),
}


export * as errors from "./errors"
