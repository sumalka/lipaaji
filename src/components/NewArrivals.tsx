import React, { useEffect, useState } from 'react';
import './NewArrivals.css';

const NewArrivals = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('new-arrivals');
    if (stored) setProducts(JSON.parse(stored));
  }, []);

  return (
    <section className="new-arrivals">
      <h2>New Arrivals</h2>
      <div className="products-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.imageUrl} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
