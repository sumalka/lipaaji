import React, { useState, useEffect, useMemo } from 'react';
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

  // AI-driven optimization: Calculate slides and memoize for performance
  const itemsPerSlide = 4;
  const totalSlides = useMemo(() => Math.ceil(products.length / itemsPerSlide), [products]);

  useEffect(() => {
    if (products.length === 0 || totalSlides === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [products, totalSlides]);

  // AI-driven edge case handling: Display message if no products
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
        <div
          className="slideshow"
          style={{ transform: `translateX(-${currentSlide * (100 / totalSlides)}%)` }}
        >
          {Array.from({ length: totalSlides }, (_, slideIndex) => (
            <div key={slideIndex} className="slide">
              {products
                .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                .map((product) => (
                  <div key={product.id} className="product-card">
                    <img src={product.imageUrl} alt={product.name} loading="lazy" />
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="price">LKR {product.price}</p>
                      <p className="discount">LKR {Math.round(product.price * 0.33).toLocaleString()} with KOKO or <span className="payment">mintpay</span></p>
                    </div>
                  </div>
                ))}
              {/* AI-driven adjustment: Add empty placeholders for last slide if needed */}
              {products.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).length < itemsPerSlide &&
                Array.from({ length: itemsPerSlide - products.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).length }).map((_, idx) => (
                  <div key={`placeholder-${idx}`} className="product-card placeholder" />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;