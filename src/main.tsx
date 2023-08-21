import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


// Global style 
import './index.css';

// Authentication
import { isAuth } from './auth';

// Entry 
import App from './App';

// Pages 
import Dash from './pages/dashboard';
import AddVehicle from './pages/add';
import NotFound from './pages/notfound';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={isAuth() ? <Navigate to="/dashboard" /> : <App />} />
      <Route path="/add" element={isAuth() ? <AddVehicle /> : <Navigate to="/" />} />
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
