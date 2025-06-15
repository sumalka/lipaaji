// src/components/NewArrivals.tsx
import React, { useEffect, useState, useMemo, useRef } from 'react';
import axios from 'axios';
import './NewArrivals.css';

// Define the product interface for type safety
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  createdAt?: Date; // Optional, as it comes from Prisma but may not be needed in display
}

const NewArrivals: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideshowRef = useRef<HTMLDivElement>(null);

  // Fetch new arrivals from the backend
  useEffect(() => {
    axios
      .get('http://localhost:3000/new-arrivals')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching new arrivals:', error));
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
                      <p className="price">LKR {product.price.toLocaleString()}</p>
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
                        <p className="price">LKR {product.price.toLocaleString()}</p>
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