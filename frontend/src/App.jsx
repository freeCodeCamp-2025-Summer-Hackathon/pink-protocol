import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Layout } from './layout/Layout.jsx'

const PagePlaceholder = () => <></>

const DashboardPage = lazy(() => import('./features/dashboard/page.jsx'))
const SignUpPage = lazy(() => import('./auth/SignUp/page.jsx'))
const LoginPage = lazy(() => import('./auth/Login/page.jsx'))
const PostPage = lazy(() => import('./features/post/page.jsx'))

export const App = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route element={<Layout />}>
        <Route element={<DashboardPage />} index />
        <Route element={<PagePlaceholder title="Upload" />} path="/upload" />
        <Route element={<PagePlaceholder title="Collections" />} path="/collections" />
        <Route element={<PagePlaceholder title="Settings" />} path="/settings" />
        <Route element={<PostPage />} path="/posts/:postId" />
      </Route>
      <Route element={<SignUpPage />} path="/signup" />
      <Route element={<LoginPage />} path="/login" />
    </Routes>
  </Suspense>
)

export default App
