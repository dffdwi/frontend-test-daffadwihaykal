import React, { useState, useLayoutEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const NavItem = ({ children, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `nav-link justify-center text-center ${isActive ? "active underline decoration-4 underline-offset-8" : ""}`
    }
  >
    {children}
  </NavLink>
);

const Navigation = () => (
  <nav className="flex gap-4 justify-between">
    <NavItem to="/work">Work</NavItem>
    <NavItem to="/about">About</NavItem>
    <NavItem to="/services">Services</NavItem>
    <NavItem to="/ideas">Ideas</NavItem>
    <NavItem to="/careers">Careers</NavItem>
    <NavItem to="/contact">Contact</NavItem>
  </nav>
);

function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    // Reset header visibility when navigating to a new page
    setShowHeader(true);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex gap-5 justify-center px-20 bg-orange-600 shadow-sm max-md:flex-wrap max-md:px-5 transition-all duration-500 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      } ${isAtTop ? "bg-opacity-100" : "bg-opacity-80"}`}
    >
      <div className="flex justify-center items-center">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7cbd7b204f03b284694f24986d3ca7fc8608931223570cd4c0cd5257c9109342?apiKey=8f8528e23e2f43b68a1c2de0d919d80c&"
          className="aspect-[1.72] w-[97px]"
          alt="Company logo"
        />
      </div>
      <div className="flex flex-col flex-1 justify-center items-end px-16 my-auto text-xs font-medium leading-4 text-white whitespace-nowrap max-md:max-w-full">
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
