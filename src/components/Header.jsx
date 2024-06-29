/* eslint-disable react/button-has-type */
import React, { useState, useLayoutEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function NavItem({ children, to, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => `nav-link block px-4 py-2 text-center ${isActive ? 'active underline decoration-4 underline-offset-8' : ''}`}
    >
      {children}
    </NavLink>
  );
}

function Navigation({ onNavItemClick }) {
  return (
    <nav className="flex gap-4 justify-between md:flex">
      <NavItem to="/work" onClick={onNavItemClick}>Work</NavItem>
      <NavItem to="/about" onClick={onNavItemClick}>About</NavItem>
      <NavItem to="/services" onClick={onNavItemClick}>Services</NavItem>
      <NavItem to="/ideas" onClick={onNavItemClick}>Ideas</NavItem>
      <NavItem to="/careers" onClick={onNavItemClick}>Careers</NavItem>
      <NavItem to="/contact" onClick={onNavItemClick}>Contact</NavItem>
    </nav>
  );
}

function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  useLayoutEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }

      setShowHeader((prevShowHeader) => {
        if (prevShowHeader && currentScrollY > 0 && currentScrollY > lastScrollY.current) {
          return false;
        }
        if (!prevShowHeader && currentScrollY > 0 && currentScrollY < lastScrollY.current) {
          return true;
        }
        return prevShowHeader;
      });

      lastScrollY.current = currentScrollY;
    };

    const lastScrollY = { current: window.scrollY };
    handleScroll(); // Initialize state

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    // Reset header visibility when navigating to a new page
    setShowHeader(true);
    setIsDropdownOpen(false); // Close dropdown when navigating to a new page
  }, [location.pathname]);

  const handleNavItemClick = () => {
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex gap-5 justify-center px-20 bg-orange-600 shadow-sm max-md:flex-wrap max-md:px-5 transition-all duration-500 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      } ${isAtTop ? 'bg-opacity-100' : 'bg-opacity-80'}`}
    >
      <div className="flex justify-between items-center w-full md:w-auto">
        <img
          loading="lazy"
          src="../../logo-suitmedia.png"
          className="w-20"
          alt="Company logo"
        />
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleDropdown}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      <div className="hidden md:flex flex-col flex-1 justify-center items-end px-16 my-auto text-xs font-medium leading-4 text-white whitespace-nowrap max-md:max-w-full">
        <Navigation onNavItemClick={handleNavItemClick} />
      </div>
      {isDropdownOpen && (
        <div className="md:hidden flex flex-col items-start bg-orange-600 w-full px-4 py-2 space-y-2">
          <Navigation onNavItemClick={handleNavItemClick} />
        </div>
      )}
    </header>
  );
}

export default Header;
