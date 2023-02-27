import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage/HomePage';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
  const {loading} = useSelector((state) => state.alerts)
  return (
    <BrowserRouter>
        { loading && (   
          <div className="spinner-container">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
      <Toaster position= "top-center" reverseOrder/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
      </Routes> 
    </BrowserRouter>

  );
}

export default App;
