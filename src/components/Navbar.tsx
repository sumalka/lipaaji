// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-gray-100 text-gray-800 font-sans shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-[#002f9d]">LIPAAJI</div>

      {/* Navigation Links */}
      <ul className="flex gap-10">
        {/* Home */}
        <li className="flex items-center justify-center cursor-pointer transition-colors duration-300 hover:text-pink-500">
          <Link to="/">Home</Link>
        </li>

        {/* Shop (with dropdown) */}
        <li className="relative group flex items-center justify-center cursor-pointer transition-colors duration-300 hover:text-pink-500">
          <span>Shop</span>

          {/* Dropdown Menu */}
          <ul className="absolute hidden group-hover:flex flex-col top-full left-1/2 transform -translate-x-1/2 bg-white shadow-lg z-50 py-1 min-w-[100px]">
            <li className="px-4 py-2 whitespace-nowrap transition-colors duration-300 hover:bg-gray-100">
              <Link to="/category/frocks">Frocks</Link>
            </li>
            <li className="px-4 py-2 whitespace-nowrap transition-colors duration-300 hover:bg-gray-100">
              <Link to="/category/tops">Tops</Link>
            </li>
            <li className="px-4 py-2 whitespace-nowrap transition-colors duration-300 hover:bg-gray-100">
              <Link to="/category/skirts">Skirts</Link>
            </li>
            <li className="px-4 py-2 whitespace-nowrap transition-colors duration-300 hover:bg-gray-100">
              <Link to="/category/pants">Pants</Link>
            </li>
          </ul>
        </li>

        {/* About */}
        <li className="flex items-center justify-center cursor-pointer transition-colors duration-300 hover:text-pink-500">
          <Link to="/about">About</Link>
        </li>

        {/* Contact */}
        <li className="flex items-center justify-center cursor-pointer transition-colors duration-300 hover:text-pink-500">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
