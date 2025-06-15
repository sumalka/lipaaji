import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import UserLayout from './components/UserLayout';
import Banner from './components/Banner';
import NewArrivals from './components/NewArrivals';
import Hero from './components/Footer';
import CategoryPage from './components/CategoryPage';
import FrockPage from './components/FrockPage';
import CollectionPage from './components/CollectionPage';

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
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/frocks" element={<FrockPage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/collections/:collectionName" element={<CollectionPage />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Route>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/new-arrivals" element={<NewArrivalPage />} />
      </Routes>
    </Router>
  );
}

export default App;