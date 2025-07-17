import React from 'react'
import SignUp from './pages/SignUp'
import { Routes, Route } from 'react-router-dom'

import { Layout } from './Layout'

const PagePlaceholder = () => <></>

export const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route element={<PagePlaceholder title="Dashboard" />} index />
      <Route element={<PagePlaceholder title="Upload" />} path="/upload" />
      <Route element={<PagePlaceholder title="Collections" />} path="/collections" />
      <Route element={<PagePlaceholder title="Inbox" />} path="/inbox" />
      <Route element={<PagePlaceholder title="Settings" />} path="/settings" />
      <Route element={<SignUp />} path="/signup" />
    </Route>
  </Routes>
)

export default App
