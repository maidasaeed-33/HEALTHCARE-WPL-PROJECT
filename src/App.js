import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './MyComponents/About';
import MainHome from './MyComponents/Mainhome';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
