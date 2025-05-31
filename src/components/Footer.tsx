// File: Footer.tsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Shop Column */}
        <div className="footer-column">
          <h3>SHOP</h3>
          <ul>
            <li><a href="#">HOME</a></li>
            <li><a href="#">NEW ARRIVALS</a></li>
            <li><a href="#">VIEW COLLECTIONS</a></li>
            <li><a href="#">KELLY FELDER</a></li>
            <li><a href="#">REDVERS BULLER</a></li>
            <li><a href="#">SCYLLA ZELUS</a></li>
            <li><a href="#">Accessories</a></li>
          </ul>
        </div>

        {/* Information Column */}
        <div className="footer-column">
          <h3>INFORMATION</h3>
          <ul>
            <li><a href="#">ABOUT US</a></li>
            <li><a href="#">CONTACT US</a></li>
            <li><a href="#">ANGEL CLUB</a></li>
          </ul>
        </div>

        {/* Terms of Use Column */}
        <div className="footer-column">
          <h3>TERMS OF USE</h3>
          <ul>
            <li><a href="#">TERMS & CONDITIONS</a></li>
            <li><a href="#">PRIVACY POLICY</a></li>
            <li><a href="#">SHIPPING & RETURNS</a></li>
          </ul>
        </div>

        {/* Newsletter Sign Up Column */}
        <div className="footer-column newsletter">
          <h3>NEWSLETTER SIGN UP</h3>
          <p>Sign up for exclusive updates, new arrivals & insider only discounts</p>
          <form className="newsletter-form">
            <input type="email" placeholder="enter your email address" />
            <button type="submit">SUBMIT</button>
          </form>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-tiktok"></i></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-left">
          <p>© 2025 LIPAAJI</p>
        </div>
        <div className="footer-right">
          <img src="/path-to-visa-logo.png" alt="Visa" />
          <img src="/path-to-mastercard-logo.png" alt="Mastercard" />
          <p>GO TO SETTINGS TO ACTIVATE WINDOWS.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;