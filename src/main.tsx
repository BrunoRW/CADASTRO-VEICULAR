import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dash from './pages/dashboard';
import NotFound from './pages/notfound';
import { isAuth } from './auth';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={isAuth() ? <Navigate to="/dashboard" /> : <App />} />
      <Route path="/dashboard" element={isAuth() ? <Dash /> : <Navigate to="/" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
