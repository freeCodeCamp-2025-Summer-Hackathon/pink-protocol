import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Layout } from './layout/Layout.jsx'

const PagePlaceholder = () => <></>

const DashboardPage = lazy(() => import('./features/dashboard/DashboardPage.jsx'))
const SignUp = lazy(() => import('./SignUp.jsx'))

export const App = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route element={<Layout />}>
        <Route element={<DashboardPage />} index />
        <Route element={<PagePlaceholder title="Upload" />} path="/upload" />
        <Route element={<PagePlaceholder title="Collections" />} path="/collections" />
        <Route element={<PagePlaceholder title="Settings" />} path="/settings" />
      </Route>
      <Route element={<SignUp />} path="/signup" />
    </Routes>
  </Suspense>
)

export default App
