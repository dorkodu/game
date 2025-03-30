
export const url = "http://api.dorkodu.com/reportError"

export enum LogKind {
  ERROR = "ERROR",
  INFO = "INFO",
  WARNING = "WARNING",
}

export function log(value: any, kind?: LogKind) {
  if (import.meta.env.DEV) {
    switch (kind) {
      case LogKind.ERROR:
        console.error(value)
        break;
      case LogKind.INFO:
        console.info(value)
        break;
      case LogKind.WARNING:
        console.warn(value)
        break;
      default:
        console.log(value)
        break;
    }
  }
}

export function reportToRemote(value: any) {
  const message = createReportMessage(value)

  return fetch(url, {
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json"
    }
  })
}

function createReportMessage(value: any) {
  return {
    meta: {
      app: "trekie/web",
      timestamp: new Date().toDateString(),
    },
    data: value
  }
} 