import AppointmentDetails from './components/Appointment/AppointmentDetails';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Layout/Navbar';

import { useState } from 'react';
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppointmentPage from './components/Appointment/AppointmentPage';
import "./index.css";

function App() {



  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<AppointmentPage />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/details" element={<AppointmentDetails />}/>
        </Routes>
    </Router>
  )
}

export default App

