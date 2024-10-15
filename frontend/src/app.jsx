import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/start';
import DatasetPage from './pages/dataset';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/start' element={<HomePage />} />
        <Route path='/dataset' element={<DatasetPage />} />
        <Route path='/*' element={<Navigate to='/start' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
