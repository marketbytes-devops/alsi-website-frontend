import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import SocialLink from "../../SocialLink";
import Copyright from "../../Copyright";
import apiClient from "../../../api";

const Sidebar = ({ closeSidebar }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const [isScrolled, setIsScrolled] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownToggle = (index) => {
    setDropdownOpen(isDropdownOpen === index ? null : index);
  };

  const closeSidebarOnScroll = () => {
    setIsScrolled(false);
    closeSidebar();
  };

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  useEffect(() => {
    if (isScrolled && !currentPath.startsWith("/services")) {
      setTimeout(closeSidebarOnScroll, 50);
    }
  }, [isScrolled, currentPath]);

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
    <motion.div
      className="fixed top-0 right-0 w-full sm:w-[350px] h-screen sm:h-full z-50 bg-gradient-to-t from-blue-900 to-blue-500 text-white"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 500, damping: 35 }}
    >
      <button
        className="absolute top-6 right-8 text-2xl"
        onClick={closeSidebar}
      >
        <FontAwesomeIcon
          icon={faArrowRight}
          size="sm"
          style={{ color: "white" }}
        />
      </button>
      <div className="flex flex-col h-full justify-center px-6 sm:px-12 overflow-y-auto">
        {link.items.map((item, index) =>
          item.subItems ? (
            <div key={item.title} className="w-full overflow-y-auto no-scrollbar">
              <button
                className={`block text-sm text-white w-full text-left items-center justify-between px-3 py-3 hover:font-semibold border-b border-white border-opacity-25 ${
                  currentPath === item.path || isMarketActive()
                    ? "font-semibold"
                    : ""
                } ${
                  isDropdownOpen !== null && isDropdownOpen !== index
                    ? "opacity-50"
                    : "opacity-100"
                }`}
                onClick={() => handleDropdownToggle(index)}
              >
                {item.title}
                <span className="ml-2">
                  <FontAwesomeIcon icon={faAngleDown} />
                </span>
              </button>
              {isDropdownOpen === index && (
                <motion.div
                  className="ml-4 space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.subItems.map((subItem) => (
                    <div key={subItem.title}>
                      <Link
                        to={subItem.path}
                        state={{
                          banner_image: subItem.banner_image,
                          service_title: subItem.service_title,
                          content_paragraphs: subItem.content_paragraphs,
                        }}
                        className={`block text-sm text-white px-3 py-3 hover:font-bold border-b border-white border-opacity-25 ${
                          currentPath === item.path || isMarketActive()
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        {subItem.title}
                      </Link>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ) : (
            <div
              key={item.title}
              className={`${
                isDropdownOpen !== null ? "opacity-50" : "opacity-100"
              }`}
            >
              <Link
                to={item.path}
                className={`block text-sm text-white px-3 py-3 hover:font-bold border-b border-white border-opacity-25 ${
                  currentPath === item.path ? "font-bold" : ""
                }`}
              >
                {item.title}
              </Link>
            </div>
          )
        )}
        <div className="block justify-start absolute bottom-0 mt-10 px-3 py-3">
          <SocialLink />
          <div className="mt-2">
            <Copyright fontSize="9.5px" textColor="white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
