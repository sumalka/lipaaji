import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">LIPAAJI</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li className="dropdown">
          <span>Shop</span>
          <ul className="dropdown-menu">
            <li><Link to="/category/frocks">Frocks</Link></li>
            <li><Link to="/category/tops">Tops</Link></li>
            <li><Link to="/category/skirts">Skirts</Link></li>
            <li><Link to="/category/pants">Pants</Link></li>
          </ul>
        </li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
