import React, { useState, useEffect } from 'react';
import './NewArrivals.css';

const NewArrivals = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('new-arrivals');
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % products.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [products]);

  if (products.length === 0) {
    return (
      <div className="new-arrivals">
        <h2>New Arrivals</h2>
        <p>No new arrivals available.</p>
      </div>
    );
  }

  return (
    <div className="new-arrivals">
      <h2>New Arrivals</h2>
      <div className="slideshow-container">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={product.imageUrl} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;