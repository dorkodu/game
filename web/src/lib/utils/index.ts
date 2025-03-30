import { z } from 'zod'

// By declaring a unique symbol, we create a distinct marker in TypeScript.
declare const __brand: unique symbol

// Define a Branded type that combines a base type with a brand
export type Branded<Type, Brand> = Type & {
  readonly [__brand]: Brand
}

export function wait<T>(
  start: () => Promise<T>,
  before: number = 100,
  after: number = 500
): () => Promise<T> {
  let out: T

  return () =>
    new Promise(async resolve => {
      let didBefore = false
      let didAfter = false
      let loaded = false

      setTimeout(() => {
        if (loaded) resolve(out)
        didBefore = true
      }, before)

      setTimeout(() => {
        if (loaded) resolve(out)
        didAfter = true
      }, after)

      out = await start()

      if (!didBefore || didAfter) resolve(out)
      loaded = true
    })
}

export function getDayDiff(from: number, to: number): number {
  const _from = new Date(from)
  const _to = new Date(to)

  _from.setUTCHours(0, 0, 0, 0)
  _to.setUTCHours(0, 0, 0, 0)

  const diffMs = _to.getTime() - _from.getTime()
  const dayDiff = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  return dayDiff
}

export function isSameDay(
  t1: Timestamp | undefined,
  t2: Timestamp | undefined
): boolean {
  if (!t1 || !t2) return false
  return getDayDiff(t1, t2) === 0
}

export type Maybe<T> = NonNullable<T> | undefined

// Date & Time Utils
export type Timestamp = number

export type Daystamp = Branded<string, 'Daystamp'>

export const daystamp = {
  get(input?: Timestamp): Daystamp {
    let date = new Date(input ?? Date.now())
    return date.toISOString().split('T')[0] as Daystamp
  },
  fromDate(date: Date): Daystamp {
    return date.toISOString().split('T')[0] as Daystamp
  },
  match(daystamp: Daystamp, timestamp: Timestamp): boolean {
    return daystamp == this.get(timestamp)
  },
  today(): Daystamp {
    return this.get(Date.now())
  }
}

export const sleep = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms))

export function inferSchema<T extends z.ZodTypeAny>(schema: T) {
  return schema
}

export function arrayRemoveItem<T>(arr: Array<T>, value: T): Array<T> {
  const index = arr.indexOf(value)
  if (index > -1) arr.splice(index, 1)
  return arr
}

export { format } from './format'

export * as utils from '.'
