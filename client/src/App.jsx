import { Route, Routes } from 'react-router';
import { Home } from './pages/home/Home.js';
import { Navbar } from './pages/navbar/Navbar.js';
import { About } from './pages/about/About.js';

export const App = () => {
  return (
    <>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
      </Routes>
    </>
  );
};