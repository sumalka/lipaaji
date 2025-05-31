import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Banner from './components/Banner';
import NewArrivals from './components/NewArrivals';

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
      </Routes>
    </Router>
  );
}

export default App;
