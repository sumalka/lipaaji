// src/components/Navbar.tsx
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && event.target && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/20 backdrop-blur-lg drop-shadow-lg px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/*Mobile Hamburger Menu */}
        {/* Left Side: Logo + Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mt-[10px] text-[#002f9d] hover:text-pink-500 focus:outline-none"
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

          {/* Logo */}
          <a href="/"><img
            src="/navlogo.png"
            alt="LIPAAJI Logo"
            className="h-10 w-auto"
          /></a>
        </div>

        {/* Desktop Links + Search */}
        <div className="hidden sm:flex items-center gap-4 sm:gap-6">
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
        <div className="md:hidden items-center justify-between">
          {/* Mobile menu & search controls */}
          <div className="flex items-center gap-2 sm:hidden absolute top-3 right-4 z-50">
            {/* Search input (expandable) */}
            <div
              ref={searchRef}
              className={`flex mt-[1.5px] items-center transition-all duration-300 ease-in-out ${searchOpen ? 'w-44 h-10' : 'w-10 h-10'} rounded-full px-2 border border-gray/30`}
            >
              <MagnifyingGlassIcon
                className="h-6 w-6 text-[#002f9d] cursor-pointer"
                onClick={() => setSearchOpen(!searchOpen)}
              />
              {searchOpen && (
                <input
                  type="text"
                  placeholder="Search..."
                  className="ml-2 bg-transparent text-sm text-[#002f9d] placeholder-[#002f9d]/70 outline-none w-full"
                  autoFocus
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ****************************************** Mobile Menu Panel ************************************************************ */}
      <div
        className={`md:hidden transition-max-height duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-[300px]' : 'max-h-0'
          }`}
      >
        <div className="pt-4 pb-6 space-y-4">
          {/* Links */}
          <ul className="flex flex-row justify-center gap-6 px-4 flex-wrap">
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
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
