import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Footer';
import Banner from './components/Banner';
import NewArrivals from './components/NewArrivals';

import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import NewArrivalPage from './admin/NewArrivalPage';

function UserWebsite() {
  return (
    <>
      <Navbar />
      <Banner />
      <NewArrivals />
      <Hero />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserWebsite />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/new-arrivals" element={<NewArrivalPage />} />
      </Routes>
    </Router>
  );
}

export default App;
