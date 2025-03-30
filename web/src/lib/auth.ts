import { useEffect } from "react"
import { useAppStore } from "./stores/appStore"

export function useAuthCheck() {
  const loading = useAppStore($ => $.loading)

  useEffect(() => {
    // TODO: Perform authorization logic by sending a request to the API
    // TODO: check if any session exist locally, verify, validate from API
    if (!loading.auth) return
    // auth.login()
  }, [loading.auth])
}