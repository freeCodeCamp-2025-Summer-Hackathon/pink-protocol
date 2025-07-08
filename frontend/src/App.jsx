import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';

const PagePlaceholder = () => (
  <></>
);

export const App = () => (
  <Routes>
    <Route element={<Layout/>}>
      <Route index element={<PagePlaceholder title="Dashboard"/>}/>
      <Route path="/upload" element={<PagePlaceholder title="Upload"/>}/>
      <Route path="/collections" element={<PagePlaceholder title="Collections"/>}/>
      <Route path="/inbox" element={<PagePlaceholder title="Inbox"/>}/>
      <Route path="/settings" element={<PagePlaceholder title="Settings"/>}/>
    </Route>
  </Routes>
);

export default App;
