import { QueryClient } from "@tanstack/react-query"
import { notifications } from "./notifications"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
    mutations: {
      onError(error, _variables, _context) {
        notifications.error(error.message)
      },
    },
  },
})
