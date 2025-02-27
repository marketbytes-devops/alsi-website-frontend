import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/images/Home/logo.webp";
import SocialLink from "../../SocialLink";
import Nav from "../Nav";
import GetQuote from "../../Button/GetQuote";
import apiClient from "../../../api";

const Navbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [services, setServices] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await apiClient.get("service/services/");
        const formattedServices = response.data.map((service) => ({
          title: stripHtml(service.title || ""),
          path: `/services/${service.link_url}`,
          image: service.image || "",
          banner_image: service.banner_image || "",
          service_title: service.service_title,
          subtitle: service.subtitle || "",
          content_paragraphs: service.content_paragraphs || "",
        }));
        setServices(formattedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const link = {
    items: [
      { title: "Home", path: "/" },
      { title: "About Us", path: "/about-us" },
      {
        title: "Services",
        path: "/services/services",
        subItems: services, 
      },
      { title: "Our Network", path: "/our-network" },
      { title: "Industries", path: "/industries" },
      { title: "Market Updates", path: "/market-updates" },
      { title: "Gallery", path: "/gallery" },
      { title: "Contact Us", path: "/contact-us" },
      { title: "Careers", path: "/careers" },
    ],
  };

  const isMarketActive = () => {
    const marketRoutes = ["/market-updates", "/market-updates/"];
    return marketRoutes.some((route) => location.pathname.startsWith(route));
  };

  return (
    <>
      <div className="md:hidden">
        <Nav toggleSidebar={toggleSidebar} />
      </div>
      <nav
        className={`hidden md:block sticky top-0 w-full transition-colors duration-300 ease-in-out z-40 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div
          className={`flex items-center justify-end sm:pr-4 md:pr-16 lg:pr-16 transition-all duration-300 overflow-hidden ${
            isScrolled ? "max-h-0 opacity-0 py-0" : "max-h-10 opacity-100 py-1"
          }`}
        >
          <SocialLink className="text-gray-500" />
        </div>
        <div className="flex justify-between items-center pl-16 py-1">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-16 sm:h-16 md:h-20 lg:h-20" />
          </Link>
          <div className="flex items-center">
            <nav className="flex space-x-4 pr-16">
            {link.items.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setDropdownOpen(index)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                {item.subItems ? (
                  <span
                    className={`text-gray-800 text-[15px] ml-5 ${
                      dropdownOpen === index || location.pathname.startsWith("/services")
                        ? "font-bold"
                        : "font-medium"
                    } hover:font-bold transition duration-300 flex items-center cursor-pointer`}
                    onClick={(e) => e.preventDefault()} 
                  >
                    {item.title}
                    <FontAwesomeIcon
                      icon={faSortDown}
                      className="ml-2 relative bottom-1"
                      size="1x"
                    />
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-gray-800 text-[15px] ml-5 ${
                      location.pathname === item.path ||
                      (item.title === "Market Updates" && isMarketActive())
                        ? "font-bold"
                        : "font-medium"
                    } hover:font-bold transition duration-300 flex items-center`}
                  >
                    {item.title}
                  </Link>
                )}
                {item.subItems && dropdownOpen === index && (
                  <div className="absolute left-5 w-[300px] h-auto py-1 bg-white border border-gray-200 shadow-lg rounded-lg">
                    {item.subItems.map((subItem) => (
                      <Link
                        to={subItem.path}
                        state={{
                          banner_image: subItem.banner_image,
                          service_title: subItem.service_title,
                          content_paragraphs: subItem.content_paragraphs,
                        }}
                        key={subItem.path}
                        className={`block px-5 my-2 text-gray-800 ${
                          location.pathname === subItem.path ? "font-bold" : "font-medium"
                        } hover:font-bold transition duration-300`}
                      >
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
