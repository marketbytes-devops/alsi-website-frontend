import React, { useState, useEffect } from "react";
import logo from "../../../assets/images/Home/logo.webp";
import SocialLink from "../../SocialLink";
import { Link } from "react-router-dom";
import GetQuote from "../../Button/GetQuote";

const Nav = ({ toggleSidebar }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full top-0 transition-colors duration-300 ease-in-out z-50 ${
          isScrolled ? "bg-white shadow-md" : "bg-white"
        }`}
      >
        {/* Social Links - Hidden when scrolled */}
        <div
          className={`flex items-center justify-end pr-4 sm:pr-4 md:pr-16 lg:pr-20 py-1 mx-2 transition-all duration-300 overflow-hidden ${
            isScrolled ? "max-h-0 opacity-0 py-0" : "max-h-10 opacity-100 py-1"
          }`}
        >
          <SocialLink className="text-gray-500" />
        </div>
        
        {/* Main Nav Bar */}
        <div className="flex justify-between items-center px-4 sm:px-4 md:px-16 lg:px-20 py-1">
          <Link to="/">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-16 sm:h-16 md:h-20 lg:h-20" 
            />
          </Link>
          
          <button 
            onClick={toggleSidebar}
            className="z-50 p-2"
            style={{ 
              background: "none", 
              border: "none", 
              cursor: "pointer" 
            }}
          >
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                style={{
                  width: "24px",
                  height: "3px",
                  backgroundColor: "rgb(32, 68, 162)",
                  margin: "4px 0",
                  borderRadius: "2px",
                  transition: "0.3s"
                }}
              />
            ))}
          </button>
        </div>
      </nav>
      <GetQuote />
    </>
  );
};

export default Nav;