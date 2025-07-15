import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Layout } from './Layout'

import { LoginPage }  from './pages/LoginPage/LoginPage'

const PagePlaceholder = () => <></>

export const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route element={<PagePlaceholder title="Dashboard" />} index />
      <Route element={<PagePlaceholder title="Upload" />} path="/upload" />
      <Route element={<PagePlaceholder title="Collections" />} path="/collections" />
      <Route element={<PagePlaceholder title="Inbox" />} path="/inbox" />
      <Route element={<PagePlaceholder title="Settings" />} path="/settings" />
      <Route path="/login" element={<LoginPage/>}/>
    </Route>
  </Routes>
)

export default App
