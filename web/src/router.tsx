import App from '@web/App'
import React, { Suspense } from 'react'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, useParams } from 'react-router-dom'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={layout('Game')}>
        <Route index element={view('Home')} />

        <Route path="/" element={view('Home')} />

        {/* xxxxxxxxx.yz/@doruk */}
        <Route path="/:path" element={<PathMiddleware />} />
      </Route>

      {/* Error routes & catch all */}
      <Route path="*" element={view('NotFound')} />
    </Route>
  )
)

//? ROUTING UTILS

export function PathMiddleware() {
  let path = useParams().path ?? ""

  let isProfile = path.startsWith('@') // intended to be a user handle

  if (!isProfile) return <Navigate to="/404" />
  return view('Profile')
}

// ----------------------------------------------

import { utils } from '@web/lib/utils'
import CenterLoader from '@web/ui/components/loaders/CenterLoader'

export function view(path: string) {
  return suspenseLoader(
    React.lazy(utils.wait(() => import(`./ui/views/${path}.tsx`)))
  )
}

export function layout(path: string) {
  return suspenseLoader(
    React.lazy(utils.wait(() => import(`./ui/layouts/${path}.tsx`)))
  )
}

export function suspenseLoader(
  Component: React.LazyExoticComponent<React.ComponentType<any>>
) { return <Suspense fallback={<CenterLoader />}><Component /></Suspense> }
