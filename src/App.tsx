import AppointmentDetails from './components/Appointment/AppointmentDetails';
import AppointmentPage from './components/Appointment/AppointmentPage';
import Dashboard from './components/Appointment/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Layout/Navbar';
import "./index.css";

import { useEffect } from 'react';
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { checkAuth } from './store/authSlice';
import { useAppDispatch, type RootState } from './store/store';


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<AppointmentPage />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/details/:id" element={<AppointmentDetails />}/>
          <Route path="/dashboard" element={<Dashboard/> } />
        </Routes>
    </Router>
  )
}

export default App

