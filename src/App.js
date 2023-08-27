import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage/HomePage';
import { useSelector } from 'react-redux';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyStudent from './pages/ApplyStudent/ApplyStudent';

function App() {
  const {loading} = useSelector((state) => state.alerts)
  return (
    <BrowserRouter>
        { loading && (   
          <div className="spinner-container">
            <div className="spinner-border" role="status"></div>
          </div>
        )}
      <Toaster position= "top-center" reverseOrder/>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>} />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>} />
        <Route path="/home" element={
          <ProtectedRoute>
              <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/apply-student" element={
          <ProtectedRoute>
              <ApplyStudent />
          </ProtectedRoute>
        } />
      </Routes> 
    </BrowserRouter>

  );
}

export default App;
