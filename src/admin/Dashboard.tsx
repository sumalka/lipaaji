import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin-auth');
    if (isLoggedIn !== 'true') {
      navigate('/admin-login'); // 🔐 block access if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    navigate('/admin-login');
  };

  return (
    <AdminLayout>
      <h1>Welcome Admin 👋</h1>
      <p>Manage your banners, products and more.</p>
      <button onClick={handleLogout} style={{ marginTop: '2rem', padding: '0.5rem 1rem', background: '#002f9d', color: 'white' }}>
        Logout
      </button>
    </AdminLayout>
  );
};

export default Dashboard;
