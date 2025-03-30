export function percentage(percentage: number) {
  return Intl.NumberFormat("en", { style: "percent", maximumFractionDigits: 0 }).format(percentage / 100);
}

export function number(number: number, long?: boolean) {
  if (long) return Intl.NumberFormat('en').format(number)
  return Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(number)
}

export function percentile(number: number) {
  return Intl.NumberFormat('en', {
    notation: 'compact',
    style: 'percent',
  }).format(number)
}

export function date(date: number, time?: boolean) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: time ? 'short' : undefined,
  }).format(date)
}

export function relativeDateString(date: number) {
  const current = new Date()
  const target = new Date(date)
  let diff = 0

  if (current.getUTCFullYear() - target.getUTCFullYear() >= 1)
    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  else if (current.getUTCMonth() - target.getUTCMonth() >= 1)
    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
    }).format(date)
  else if (current.getUTCDate() - target.getUTCDate() >= 1)
    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
    }).format(date)
  else if ((diff = current.getUTCHours() - target.getUTCHours()) >= 1)
    return new Intl.RelativeTimeFormat('en', {
      numeric: 'always',
      style: 'narrow',
    }).format(-diff, 'hours')
  else if ((diff = current.getUTCMinutes() - target.getUTCMinutes()) >= 1)
    return new Intl.RelativeTimeFormat('en', {
      numeric: 'always',
      style: 'narrow',
    }).format(-diff, 'minutes')
  else if ((diff = current.getUTCSeconds() - target.getUTCSeconds()) >= 1)
    return new Intl.RelativeTimeFormat('en', {
      numeric: 'always',
      style: 'narrow',
    }).format(-diff, 'seconds')
  else
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      0,
      'seconds'
    )
}

export * as format from "./format";