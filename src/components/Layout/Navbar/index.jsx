import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/images/Home/logo.webp';
import SocialLink from '../../SocialLink';
import Nav from '../Nav';
import GetQuote from '../../Button/GetQuote';

const link = {
  items: [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about_us" },
    {
      title: "Services",
      path: "/services/customs_clearance",
      subItems: [
        { title: "Customs Clearance", path: "/services/customs_clearance" },
        { title: "Road Freight", path: "/services/road_freight" },
        { title: "Ocean Freight", path: "/services/ocean_freight" },
        { title: "Air Freight", path: "/services/air_freight" },
        { title: "Project Cargo Services", path: "/services/project_cargo_services" },
        { title: "Warehousing and Distribution", path: "/services/warehouse_distribution" },
        { title: "Vessel Agency", path: "/services/vessel_agency" },
        { title: "Specialized Services", path: "/services/specialized_services" },
      ],
    },
    { title: "Our Network", path: "/our_network" },
    { title: "Industries", path: "/industries" },
    { title: "Market Updates", path: "/market_updates" },
    { title: "Gallery", path: "/gallery" },
    { title: "Contact Us", path: "/contact_us" },
    { title: "Careers", path: "/careers" },
  ],
};

const Navbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className='md:hidden'>
        <Nav toggleSidebar={toggleSidebar} />
      </div>
      <nav className={`hidden md:block sticky top-0 w-full transition-colors duration-300 ease-in-out z-40 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
        <div className={`flex items-center justify-end sm:pr-4 md:pr-16 lg:pr-16 transition-all duration-300 overflow-hidden ${isScrolled ? "max-h-0 opacity-0 py-0" : "max-h-10 opacity-100 py-1"}`}>
          <SocialLink className="text-gray-500" />
        </div>
        <div className="flex justify-between items-center pl-16 py-1">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-16 sm:h-16 md:h-20 lg:h-20" />
          </Link>
          <div className="flex items-center">
            <nav className="flex space-x-4 pr-16">
              {link.items.map((item, index) => (
                <div key={index} className="relative" onMouseEnter={() => setDropdownOpen(index)} onMouseLeave={() => setDropdownOpen(null)}>
                  <Link to={item.path} className={`text-gray-800 text-[15px] ml-5 ${location.pathname === item.path ? "font-bold" : "font-medium"} hover:font-bold transition duration-300 flex items-center`}>
                    {item.title}
                    {item.subItems && <FontAwesomeIcon icon={faSortDown} className="ml-2 relative bottom-1" size="1x" />}
                  </Link>
                  {item.subItems && dropdownOpen === index && (
                    <div className="absolute left-5 w-[300px] h-auto py-1 bg-white border border-gray-200 shadow-lg rounded-lg">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link key={subIndex} to={subItem.path} className={`block px-5 my-2 text-gray-800 ${location.pathname === subItem.path ? "font-bold" : "font-medium"} hover:font-bold transition duration-300`}>
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </nav>
      <div>
      <GetQuote />
      </div>
    </>
  );
};

export default Navbar;
