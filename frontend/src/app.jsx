import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/*' element={<Navigate to='/home' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
