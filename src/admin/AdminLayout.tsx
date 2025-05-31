import React from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{
        width: '220px',
        backgroundColor: '#002f9d',
        color: 'white',
        padding: '1.5rem',
      }}>
        <h2 style={{ marginBottom: '2rem' }}>LIPAAJI Admin</h2>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2rem' }}>
            <li>Dashboard</li>
            <li>Banners</li>
            <li>Products</li>
          </ul>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '2rem', backgroundColor: '#f5f5f5' }}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
