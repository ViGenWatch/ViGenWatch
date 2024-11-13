import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/start';
import MainPage from './pages/main';
import LoginPage from './pages/login';
import useAuth from './hook/useAuth';
import SignUp from './pages/signup';
import ReferencePage from './pages/reference';
import ExportPage from './pages/export';

const App = () => {
  const { authState, refreshToken, dataSaveSession } = useAuth();
  let content;
  if (!authState.user && !refreshToken && !dataSaveSession) {
    content = (
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/*' element={<Navigate to='/login' />} />
      </Routes>
    );
  } else if (authState.user) {
    content = (
      <Routes>
        <Route path='/start' element={<HomePage />} />
        <Route path='/reference' element={<ReferencePage />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/export' element={<ExportPage />} />
        <Route path='/*' element={<Navigate to='/start' />} />
      </Routes>
    );
  }
  return <BrowserRouter>{content}</BrowserRouter>;
};

export default App;
