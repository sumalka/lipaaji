import React, { useState, useEffect, useMemo, useRef } from 'react';
import './NewArrivals.css';

const NewArrivals = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideshowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('new-arrivals');
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  const itemsPerSlide = 4;
  const totalSlides = useMemo(() => Math.ceil(products.length / itemsPerSlide), [products]);

  // Duplicate items for seamless carousel looping
  const extendedProducts = useMemo(() => {
    if (products.length <= itemsPerSlide) return products;
    return [...products, ...products.slice(0, itemsPerSlide)]; // Duplicate for smooth loop
  }, [products]);

  useEffect(() => {
    if (products.length === 0 || totalSlides === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        const nextSlide = prevSlide + 1;
        // When reaching the duplicated items, reset to the start for seamless looping
        if (nextSlide >= totalSlides) {
          setTimeout(() => {
            if (slideshowRef.current) {
              slideshowRef.current.style.transition = 'none';
              setCurrentSlide(0);
            }
          }, 500); // Match transition duration
        }
        return nextSlide;
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [products, totalSlides]);

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
          ref={slideshowRef}
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
              {products.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).length < itemsPerSlide &&
                Array.from({ length: itemsPerSlide - products.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).length }).map((_, idx) => (
                  <div key={`placeholder-${idx}`} className="product-card placeholder" />
                ))}
            </div>
          ))}
          {/* Add duplicated slides for seamless looping */}
          {products.length > itemsPerSlide &&
            Array.from({ length: 1 }, (_, slideIndex) => (
              <div key={`duplicate-${slideIndex}`} className="slide">
                {products
                  .slice(0, itemsPerSlide)
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
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;