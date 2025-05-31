import React from 'react';
import './Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-left">
        <h1>LIPAAJI – Own Your Elegance</h1>
        <p>Discover graceful styles and bold looks for modern women.</p>
        <div className="banner-buttons">
          <button className="shop-btn">Shop now</button>
          <button className="read-btn">Read & shop →</button>
        </div>
        <div className="dots">
          <span className="dot active" />
          <span className="dot" />
          <span className="dot" />
        </div>
      </div>
      <div className="banner-right">
        <img src="/assets/hero.jpg" alt="Fashion model" />
      </div>
    </div>
  );
};

export default Banner;
