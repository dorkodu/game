import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { QueryClientProvider } from '@tanstack/react-query'
import { onError, onReset } from '@web/lib/errors'
import { queryClient } from "@web/lib/react-query"
import { useAppStore } from '@web/lib/stores/appStore'
import OverlayLoader from '@web/ui/components/loaders/OverlayLoader'
import ApplicationError from '@web/ui/components/misc/ApplicationError'
import { modals } from '@web/ui/components/modals'
import { cssVariablesResolver, theme } from '@web/ui/styles/theme'
import { FlagsProvider } from 'flagged'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { useAuthCheck } from './lib/auth'

function App() {
  const loading = useAppStore($ => $.loading)
  const premium = true

  useAuthCheck() // check user session, do auth

  return (
    <ErrorBoundary FallbackComponent={ApplicationError} onError={onError} onReset={onReset}>
      <FlagsProvider features={{ beta: true, premium }}>
        <QueryClientProvider client={queryClient}>
          <ColorSchemeScript defaultColorScheme="light" />
          <MantineProvider theme={theme} defaultColorScheme="light" cssVariablesResolver={cssVariablesResolver}>
            <ModalsProvider modals={modals} modalProps={{ centered: true, radius: 'lg' }}>
              <Notifications limit={3} position="top-center" zIndex={99999} />
              {loading.auth && <OverlayLoader full={true} />}
              {!loading.auth && <Outlet />}
            </ModalsProvider>
          </MantineProvider>
          <ScrollRestoration />
        </QueryClientProvider>
      </FlagsProvider>
    </ErrorBoundary>
  )
}

export default App
