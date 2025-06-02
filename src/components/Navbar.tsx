// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/20 backdrop-blur-lg drop-shadow-lg px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-[#002f9d]">LIPAAJI</div>

        {/* Desktop Links + Search */}
        <div className="hidden md:flex items-center gap-8">
          {/* Links */}
          <ul className="flex gap-6">
            <li>
              <Link
                to="/"
                className="px-2 py-1 rounded-md text-gray-800 transition-colors duration-300 hover:bg-white/40 hover:text-pink-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="px-2 py-1 rounded-md text-gray-800 transition-colors duration-300 hover:bg-white/40 hover:text-pink-500"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="px-2 py-1 rounded-md text-gray-800 transition-colors duration-300 hover:bg-white/40 hover:text-pink-500"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products…"
              className="
                w-64
                px-4 py-1
                rounded-full
                bg-[#002f9d]/20
                placeholder-[#002f9d]/70
                text-[#002f9d]
                focus:outline-none
                focus:ring-2 focus:ring-[#002f9d]
                backdrop-blur-sm
              "
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#002f9d] hover:text-[#002f9d]/80"
              title="Search"
              aria-label="Search"
              type="button"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-800 hover:text-pink-500 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden transition-max-height duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-[300px]' : 'max-h-0'
          }`}
      >
        <div className="pt-4 pb-6 space-y-4">
          {/* Links */}
          <ul className="flex flex-col gap-4 px-4">
            <li>
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-2 py-1 rounded-md text-gray-800 transition-colors duration-300 hover:bg-white/40 hover:text-pink-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-2 py-1 rounded-md text-gray-800 transition-colors duration-300 hover:bg-white/40 hover:text-pink-500"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-2 py-1 rounded-md text-gray-800 transition-colors duration-300 hover:bg-white/40 hover:text-pink-500"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Search Bar */}
          <div className="px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products…"
                className="
                  w-full
                  px-4 py-2
                  rounded-full
                  bg-[#002f9d]/20
                  placeholder-[#002f9d]/70
                  text-[#002f9d]
                  focus:outline-none
                  focus:ring-2 focus:ring-[#002f9d]
                  backdrop-blur-sm
                "
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#002f9d] hover:text-[#002f9d]/80"
                title="Search"
                aria-label="Search"
                type="button"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
