import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/researcher/start';
import MainPage from './pages/researcher/main';
import LoginPage from './pages/auth/login';
import useAuth from './hook/useAuth';
import SignUp from './pages/auth/signup';
import ReferencePage from './pages/researcher/reference';
import ExportPage from './pages/researcher/export';
import AuthorityReference from './pages/authority/authority-reference';
import AuthorityStart from './pages/authority/authority-start';
import ForgotPasswordPage from './pages/auth/forgot-password';
import NewPasswordPage from './pages/auth/reset-password';
import AuthorityMain from './pages/authority/authority-main';
import AuthorityExport from './pages/authority/authority-export';
import ProfilePage from './pages/researcher/profile';
import { ToastProvider } from './components/Toast/ToastContext';

const App = () => {
  const { authState, refreshToken, dataSaveSession } = useAuth();
  let content;
  if (!authState.user && !refreshToken && !dataSaveSession) {
    content = (
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot' element={<ForgotPasswordPage />} />
        <Route path='/reset-password/:token' element={<NewPasswordPage />} />
        <Route path='/*' element={<Navigate to='/login' />} />
      </Routes>
    );
  } else if (authState.user) {
    switch (authState.user.role) {
      case '0x01':
        content = (
          <Routes>
            <Route path='/start' element={<HomePage />} />
            <Route path='/reference' element={<ReferencePage />} />
            <Route path='/main' element={<MainPage />} />
            <Route path='/export' element={<ExportPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/*' element={<Navigate to='/start' />} />
          </Routes>
        );
        break;
      case '0x02':
        content = (
          <Routes>
            <Route path='/start' element={<AuthorityStart />} />
            <Route path='/reference' element={<AuthorityReference />} />
            <Route path='/main' element={<AuthorityMain />} />
            <Route path='/export' element={<AuthorityExport />} />
            <Route path='/profile' element={<AuthorityExport />} />
            <Route path='/*' element={<Navigate to='/start' />} />
          </Routes>
        );
        break;
    }
  }
  return (
    <ToastProvider>
      <BrowserRouter>{content}</BrowserRouter>
    </ToastProvider>
  );
};

export default App;
