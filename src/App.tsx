import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import UserLayout from './components/UserLayout';
import Banner from './components/Banner';
import NewArrivals from './components/NewArrivals';
import Hero from './components/Footer';
import CategoryPage from './components/CategoryPage';
import FrockPage from './components/FrockPage';

import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import NewArrivalPage from './admin/NewArrivalPage';

function HomePage() {
  return (
    <>
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
        {/* All user pages wrapped with Navbar */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/frocks" element={<FrockPage />} /> {/* Specific route for Frocks */}
          <Route path="/category/:categoryName" element={<CategoryPage />} /> {/* Other categories */}
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Route>

        {/* Admin routes without navbar */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/new-arrivals" element={<NewArrivalPage />} />
      </Routes>
    </Router>
  );
}

export default App;