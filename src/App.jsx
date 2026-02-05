import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';  
import Settings from './pages/Settings';
import Applications from './pages/Applications';

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/applications" exact element={<Applications />} />
        <Route path="/settings" exact element={<Settings />} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
