import { LogKind, log } from "@web/lib/utils/log"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

export interface AppStoreState {
  online: boolean

  session?: {
    userId: string
    timestamp: number
  }

  loading: { auth: boolean }

  menu: {
    opened: boolean
  },
}

export interface AppStoreAction {
  menu: {
    toggle: () => void
    open: () => void
    close: () => void
  },
}

const initialState: AppStoreState = {
  online: false,

  loading: {
    auth: false,
  },

  session: undefined,

  menu: {
    opened: false
  },
}

export const useAppStore = create(
  immer<AppStoreState & AppStoreAction>((set, get) => ({
    ...initialState,

    menu: {
      opened: false,

      open() {
        set($ => {
          $.menu.opened = true
        })
      },

      close() {
        set($ => {
          $.menu.opened = false
        })
      },

      toggle() {
        set($ => {
          $.menu.opened = !$.menu.opened
        })
      },
    },
  }))
)
