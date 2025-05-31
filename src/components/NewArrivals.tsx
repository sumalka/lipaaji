import React, { useState, useEffect } from 'react';
import './NewArrivals.css';

const NewArrivals = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('new-arrivals');
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  if (products.length === 0) {
    return (
      <div className="new-arrivals">
        <h2>New Arrivals</h2>
        <p>No new arrivals available.</p>
      </div>
    );
  }

  // Limit to 4 items for the static row
  const displayedProducts = products.slice(0, 4);

  return (
    <div className="new-arrivals">
      <h2>New Arrivals</h2>
      <div className="products-row">
        {displayedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">LKR {product.price}</p>
              <p className="discount">LKR {Math.round(product.price * 0.33).toLocaleString()} with KOKO or <span className="payment">mintpay</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;