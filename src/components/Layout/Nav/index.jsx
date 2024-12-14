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
        className={`fixed w-full top-0 transition-colors duration-300 ease-in-out z-40 ${
          isScrolled ? "bg-white shadow-md" : "bg-white sm:bg-white md:bg-transparent lg:bg-transparent"
        }`}
      >
        <div
          className={`flex items-center justify-end px-16 sm:px-16 md:px-20 lg:px-20 xl:px-20 transition-all duration-300 overflow-hidden ${
            isScrolled ? "max-h-0 opacity-0 py-0" : "max-h-10 opacity-100 py-1"
          }`}
        >
          <SocialLink className="text-gray-500" />
        </div>
        <div className="flex justify-between items-center px-16 sm:px-16 md:px-20 lg:px-20 xl:px-20 py-1">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-16 sm:h-16 md:h-24 lg:h-24" />
          </Link>
          <button onClick={toggleSidebar} style={{ color: "rgb(32, 68, 162)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                style={{
                  width: "40px",
                  height: "4px",
                  backgroundColor: "rgb(32, 68, 162)",
                  margin: "6px 0",
                  borderRadius:"10px"
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
